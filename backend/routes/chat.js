const express = require("express");
const chatRoutes = express.Router();
const bodyParser = require("body-parser");
const { accessChats, fetchChats } = require("../controllers/chat");

chatRoutes.use(bodyParser.urlencoded({ extended: false }));
chatRoutes.use(bodyParser.json());

chatRoutes.post("/accessChats",accessChats)
chatRoutes.get("/fetchChats",fetchChats)

module.exports = { chatRoutes };