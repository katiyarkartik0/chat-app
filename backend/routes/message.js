const express = require("express");
const messageRoutes = express.Router();
const bodyParser = require("body-parser");
const { sendMessage } = require("../controllers/message");

messageRoutes.use(bodyParser.urlencoded({ extended: false }));
messageRoutes.use(bodyParser.json());

messageRoutes.post("/sendMessage",sendMessage)
// messageRoutes.get("/fetchChats",fetchChats)

module.exports = { messageRoutes };