const Chat = require("../models/chat");
const User = require("../models/user");

const accessChats = async (req, res) => {
  if (req.verified == false) {
    return res.status(403).send(req.msg);
  }
  const { recieverUserId } = req.body;
  if(!recieverUserId){
    return res.status(400).json({msg:"recieved user id is invalid"})
  }
  const userId = req.id;

  if (!userId) {
    return res.status(400).send("UserId param not sent with request");
  }

  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: userId } } },
      { users: { $elemMatch: { $eq: recieverUserId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    const chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [userId, recieverUserId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
};

const fetchChats = async (req, res) => {
  if (req.verified == false) {
    return res.status(403).send(req.msg);
  }
  const userId = req.id;

  try {
    Chat.find({ users: { $elemMatch: { $eq: userId } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400).send(error);
  }
};

const createRoom = async (req, res) => {
  if (req.verified == false) {
    return res.status(403).send(req.msg);
  }

  const { roomName } = req.body;
  const userId = req.id;

  if (!userId) {
    return res.status(400).send("UserId param not sent with request");
  }

  const chatData = {
    chatName: roomName,
    isGroupChat: true,
    users: [userId],
  };

  const isChatNameAlreadyExist = await Chat.findOne({ chatName: roomName });
  if (isChatNameAlreadyExist) {
    return res
      .status(400)
      .json({ msg: "a chat of this name already exists, try another name" });
  }
  const createdChat = await Chat.create(chatData);
  res.status(200).json(createdChat);
};

const searchChats = async (req, res) => {
  if (req.verified == false) {
    return res.status(403).send(req.msg);
  }
  if (!req.query.chatName) {
    return res.status(400).send({ msg: "query param not found" });
  }
  const keyword = { chatName: { $regex: req.query.chatName, $options: "i" } };

  try {
    Chat.find(keyword)
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { accessChats, fetchChats, searchChats, createRoom };
