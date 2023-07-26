const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { authRoutes } = require("./routes/auth");
const { userRoutes } = require("./routes/user");
const { verifyToken } = require("./middleware/verifyToken");
const { chatRoutes } = require("./routes/chat");
const { messageRoutes } = require("./routes/message");
const routes = express.Router();
const { Server } = require("socket.io");

dotenv.config();
const app = express();
app.use(cors());
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("Wlcome");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", verifyToken, userRoutes);
app.use("/api/chat", verifyToken, chatRoutes);
app.use("/api/message", verifyToken, messageRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const server = app.listen(
      process.env.PORT,
      console.log("listening to post 5000")
    );
    const io = new Server(server, {
      pingTimeout: 3600000,
      cors: {
        origin: "http://localhost:3000",
      },
    });

    io.on("connection", (socket) => {
      console.log("connected to socket.io");
      const onSetup = (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
      };
      const onJoinChat = (room) => {
        socket.join(room);
        console.log("client joined" + room);
      };

      const onNewMessage = (newMessageRecieved) => {
        const { chat } = newMessageRecieved;
        if (!chat.users) {
          return console.log("chat.users not defined");
        }

        chat.users.forEach((user) => {
          if (user._id == newMessageRecieved.sender._id) {
            return;
          }
          socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
      };

      socket.on("setup", onSetup);

      socket.on("join chat", onJoinChat);

      socket.on("new message", onNewMessage);

      socket.off("setup", onSetup);
    });
  })
  .catch((error) => console.log(error));
