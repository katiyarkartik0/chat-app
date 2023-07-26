const Chat = require("../models/chat");
const Message = require("../models/message");

const sendMessage = async (req, res) => {
  if (req.verified == false) {
    return res.status(403).send(req.msg);
  }
  const userId = req.id;
  console.log(req.body)
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    return res.status(400).send("Invalid data passed into request");
  }

  try {
    let message = new Message({
      sender: userId,
      content: content,
      chat: chatId,
    });

    await message.save();
    Message.find({
      sender: userId,
      content: content,
      chat: chatId,
    })
      .sort({ $natural: -1 })
      .limit(1)
      .populate("sender", "name")
      .populate("chat")
      .then(async (results) => {
        results = await Message.populate(results, {
          path: "chat.users",
          select: "name email",
        });
        await Chat.findByIdAndUpdate(chatId, { latestMessage: message });
        res.status(200).json(results[0]);
      });
  } catch (error) {
    res.status(400).send(error);
  }
};

const fetchAllMessages = async (req, res) => {
  if (req.verified == false) {
    return res.status(403).send(req.msg);
  }
  const { chatId } = req.params;
  try {
    const message = await Message.find({ chat: chatId })
      .populate("sender", "name email")
      .populate("chat");

      res.status(200).json(message);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { sendMessage,fetchAllMessages };
