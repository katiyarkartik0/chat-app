import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { socket } from "components/../socket";
import { messageRequest } from "api/message";
import Message from "components/ChatPage/Message/Message";

import SelectChatOrRoomSvg from "utils/SelectChatOrRoomSvg";
import {
  getAccessToken,
  getSelectedChat,
  getUserData,
} from "helpers/selectors";

import "./ChatBox.css";
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatBar from "./ChatBar/ChatBar";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const selectedChat = useSelector(getSelectedChat);
  const accessToken = useSelector(getAccessToken);
  const userData = useSelector(getUserData);
  const [rendering, setRendering] = useState(0);
  const messageScrollRef = useRef(null);

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
      console.log(newMessageRecieved);

      if (!selectedChat || selectedChat._id !== newMessageRecieved.chat._id) {
        //notify
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    };

    socket.on("message recieved", onMessageRecieved);
  });

  useEffect(() => {
    setRendering((prev) => prev + 1);
    console.log(rendering);
  }, []);

 
  useEffect(() => {
    messageScrollRef.current?.scrollIntoView();
  });

  return (
    <div className="chat-box-container">
      {selectedChat ? (
        <>
          <div className="chat-box-header">
            <ChatHeader />
          </div>
          <div className="messages">
            {messages.map((message) => (
              <Message message={message} key={message._id} />
            ))}
            <div ref={messageScrollRef}></div>
          </div>
          <ChatBar messages={messages} setMessages={setMessages}/>
         
        </>
      ) : (
        <SelectChatOrRoomSvg />
      )}
    </div>
  );
};

export default React.memo(ChatBox);
