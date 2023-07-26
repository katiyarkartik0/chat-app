import React, { useEffect, useState } from "react";
import "./ChatBox.css";
import { useSelector } from "react-redux";
import { messageRequest } from "../../../api/message";
import Message from "../Message/Message";
import { socket } from "../../../socket";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const selectedChat = useSelector((state) => state.chats.selectedChat);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    const fetchAllMessages = async () => {
      const res = await messageRequest({
        attempt: "fetchAllMessages",
        headers: { authorization: `JWT ${accessToken}` },
        method: "GET",
        params: selectedChat?._id,
      });
      console.log(res);
      if (res.ok) {
        const response = await res.json();
        console.log(response);
        setMessages(response);
      }
    };
    if (selectedChat) {
      fetchAllMessages();
      socket.emit("join chat", selectedChat._id);
    }
  }, [selectedChat]);

  useEffect(() => {
    const onConnect = () => setSocketConnected(true);
    socket.emit("setup", userData);

    socket.on("connected", onConnect);

    return () => {
      console.log("DISCONNECTING CONNECTION EVENT");
      socket.off("connected", onConnect);
    };
  }, []);

  useEffect(() => {
    const onMessageRecieved = (newMessageRecieved) => {
      if (!selectedChat || selectedChat._id !== newMessageRecieved.chat._id) {
        //notify
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    };

    socket.on("message recieved", onMessageRecieved);

    return () => {
      console.log("DISCONNECTING MESSAGE EVENT");
      socket.off("message recieved", onMessageRecieved);
    };
  });

  const handleText = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = JSON.stringify({
      content: newMessage,
      chatId: selectedChat._id,
    });

    const res = await messageRequest({
      attempt: "sendMessage",
      headers: {
        authorization: `JWT ${accessToken}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body,
    });

    console.log(res);
    if (res.ok) {
      const response = await res.json();
      console.log(response);
      setMessages([...messages, response]);
      setNewMessage("");
      socket.emit("new message", response);
    }
  };

  return (
    <div className="chat-box-container">
      <div className="messages">
        {messages.map((message) => (
          <Message message={message} key={message._id} />
        ))}
      </div>
      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your message..."
          onChange={handleText}
          value={newMessage}
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
