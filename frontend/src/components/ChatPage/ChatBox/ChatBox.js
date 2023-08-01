import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { socket } from "components/../socket";
import { fetchAllMessages, messageRequest } from "api/message";
import Message from "components/ChatPage/Message/Message";

import SelectChatOrRoomSvg from "utils/SelectChatOrRoomSvg";
import {
  getAccessToken,
  getAllChats,
  getNotificationState,
  getSelectedChat,
  getUserData,
} from "helpers/selectors";

import "./ChatBox.css";
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatBar from "./ChatBar/ChatBar";
import { setNotification, setNotificationState } from "store/slices/chatSlice";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const selectedChat = useSelector(getSelectedChat);
  const accessToken = useSelector(getAccessToken);
  const userData = useSelector(getUserData);
  const [rendering, setRendering] = useState(0);
  const messageScrollRef = useRef(null);
  const dispatch = useDispatch();
  const notificationState = useSelector(getNotificationState);

  console.log(notificationState);

  useEffect(() => {
    const polulateMessages = async () => {
      await fetchAllMessages({
        id: selectedChat?._id,
        accessToken,
      })
        .then(async (res) => {
          const response = await res.json();
          setMessages(response);
        })
        .catch((err) => alert(err));
    };
    if (selectedChat) {
      polulateMessages();
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
      console.log(newMessageRecieved);

      if (!selectedChat || selectedChat._id !== newMessageRecieved.chat._id) {
        //notify
        // const currentNotificationCount =
        //   notificationState[newMessageRecieved.chat._id] || 0;
        // dispatch(
        //   setNotificationState({
        //     [newMessageRecieved.chat._id]: currentNotificationCount + 1,
        //   })
        // );
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
          <ChatBar messages={messages} setMessages={setMessages} />
        </>
      ) : (
        <SelectChatOrRoomSvg />
      )}
    </div>
  );
};

export default React.memo(ChatBox);
