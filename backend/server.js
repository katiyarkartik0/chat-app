const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose")
const cors = require("cors");
const bodyParser = require("body-parser");
const { authRoutes } = require("./routes/auth");
const { userRoutes } = require("./routes/user");
const { verifyToken } = require("./middleware/verifyToken");
const { chatRoutes } = require("./routes/chat");
const { messageRoutes } = require("./routes/message");
const routes = express.Router();

dotenv.config()
const app = express();
app.use(cors());
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("Wlcome")
});

app.use("/api/auth",authRoutes)
app.use("/api/user",verifyToken,userRoutes);
app.use("/api/chat",verifyToken,chatRoutes);
app.use("/api/message",verifyToken,messageRoutes);


mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, console.log("listening to post 5000"));
  })
  .catch((error) => console.log(error));
