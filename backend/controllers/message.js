const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const Chat = require("../models/chat");
const Message = require("../models/message");
const dotenv = require("dotenv");
dotenv.config();

const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");

const s3client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_PROGRAMATIC_USER_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_PROGRAMATIC_USER_SECRET_ACCESS_KEY,
  },
});

const putObjectUrl = async ({ fileName, contentType }) => {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${process.env.AWS_S3_BUCKET_KEY}/${fileName}`,
    ContentType: contentType,
  });
  const url = getSignedUrl(s3client, command);
  return url;
};

const getObjectUrl = async ({ fileName }) => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${process.env.AWS_S3_BUCKET_KEY}/${fileName}`,
  });
  const url = getSignedUrl(s3client, command);
  return url;
};

const fetchPreSignedGetUrl = async (req, res) => {
  if (req.verified == false) {
    return res.status(403).send(req.msg);
  }
  const { fileName } = req.params;
  try {
    const preSignedGETUrl = await getObjectUrl({ fileName });
    res.status(200).json(preSignedGETUrl);
  } catch (error) {
    res.status(400).json(error);
  }
};

const sendMessage = async (req, res) => {
  if (req.verified == false) {
    return res.status(403).send(req.msg);
  }
  const { content, chatId, contentType, fileName } = req.body;

  let preSignedPUTUrl;
  if (fileName && contentType) {
    preSignedPUTUrl = await putObjectUrl({ fileName, contentType });
  }

  const userId = req.id;

  if (!(content || fileName) || !chatId) {
    return res.status(400).send("Invalid data passed into request");
  }

  try {
    let message = new Message({
      sender: userId,
      content: content,
      chat: chatId,
      uploadedFile: {
        fileName,
        contentType,
      },
    });

    await message.save();
    await Message.find({
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
        res.status(200).json({
          message: results[0],
          preSignedPUTUrl,
        });
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
    const messages = await Message.find({ chat: chatId })
      .populate("sender", "name email")
      .populate("chat");

    res.status(200).json(messages);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { sendMessage, fetchAllMessages, fetchPreSignedGetUrl };
