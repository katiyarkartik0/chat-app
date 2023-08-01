import { Loader } from "utils/Loader/Loader";
import "./ChatBar.css";
import Button from "components/Button/Button";
import { getAccessToken, getSelectedChat } from "helpers/selectors";
import { useState } from "react";
import { useSelector } from "react-redux";
import { sendMessage } from "api/message";
import { socket } from "components/../socket";

const ChatBar = ({ messages, setMessages }) => {
  const selectedChat = useSelector(getSelectedChat);
  const accessToken = useSelector(getAccessToken);
  const [newMessage, setNewMessage] = useState("");
  const [isMessageSending, setIsMessageSending] = useState(false);

  const handleText = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsMessageSending(true);
    await sendMessage({
      messageBody: {
        content: newMessage,
        chatId: selectedChat?._id,
      },
      accessToken,
    })
      .then(async (res) => {
        const response = await res.json();
        setMessages([...messages, response]);
        setNewMessage("");
        socket.emit("new message", response);
      })
      .catch((err) => alert(err));

    setIsMessageSending(false);
  };
  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type your message..."
        onChange={handleText}
        value={newMessage}
        className="message-input"
      />
      {isMessageSending ? <Loader /> : <Button type="submit" text="Send" />}
    </form>
  );
};

export default ChatBar;
