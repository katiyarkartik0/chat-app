import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { socket } from "components/../socket";
import { messageRequest } from "api/message";
import Message from "components/ChatPage/Message/Message";

import { Loader } from "utils/Loader/Loader";
import SelectChatOrRoomSvg from "utils/SelectChatOrRoomSvg";
import { getSelectedChat } from "helpers/selectors";

import "./ChatBox.css";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const selectedChat = useSelector(getSelectedChat);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const userData = useSelector((state) => state.auth.userData);
  const [isMessageSending, setIsMessageSending] = useState(false);

  useEffect(() => {
    const fetchAllMessages = async () => {
      const res = await messageRequest({
        attempt: "fetchAllMessages",
        headers: { authorization: `JWT ${accessToken}` },
        method: "GET",
        params: selectedChat?._id,
      });
      if (res.ok) {
        const response = await res.json();
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
  }, [userData]);

  useEffect(() => {
    const onMessageRecieved = (newMessageRecieved) => {
      console.log(newMessageRecieved)

      if (!selectedChat || selectedChat._id !== newMessageRecieved.chat._id) {
        //notify
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    };

    socket.on("message recieved", onMessageRecieved);
  });

  const handleText = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsMessageSending(true);
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

    if (res.ok) {
      const response = await res.json();
      setMessages([...messages, response]);
      setNewMessage("");
      socket.emit("new message", response);
    }
    setIsMessageSending(false);
  };

  return (
    <div className="chat-box-container">
      {selectedChat ? (
        <>
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
            {isMessageSending ? (
              <Loader />
            ) : (
              <button type="submit" className="send-button">
                Send
              </button>
            )}
          </form>
        </>
      ) : (
        <SelectChatOrRoomSvg />
      )}
    </div>
  );
};

export default ChatBox;
