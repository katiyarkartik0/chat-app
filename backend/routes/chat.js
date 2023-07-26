const express = require("express");
const chatRoutes = express.Router();
const bodyParser = require("body-parser");
const { accessChats, fetchChats, createRoom, searchChats } = require("../controllers/chat");

chatRoutes.use(bodyParser.urlencoded({ extended: false }));
chatRoutes.use(bodyParser.json());

chatRoutes.post("/accessChats",accessChats)
chatRoutes.get("/fetchChats",fetchChats)
chatRoutes.get("/search",searchChats);
chatRoutes.post("/createRoom",createRoom);

module.exports = { chatRoutes };