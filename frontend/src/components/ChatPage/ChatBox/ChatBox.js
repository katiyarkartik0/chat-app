import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { socket } from "components/../socket";
import { fetchAllMessages } from "api/message";
import Message from "components/ChatPage/Message/Message";

import SelectChatOrRoomSvg from "utils/SelectChatOrRoomSvg";
import {
  getAccessToken,
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
  const messageScrollRef = useRef(null);
  const dispatch = useDispatch();
  const notificationState = useSelector(getNotificationState);



  useEffect(() => {
    const polulateMessages = async () => {
      await fetchAllMessages({
        id: selectedChat?._id,
        accessToken,
      })
        .then(async (res) => {
          const response = await res.json();
          setMessages(response);
          dispatch(
            setNotificationState({
              [selectedChat._id]: 0,
            })
          );
        })
        .catch((err) => alert(err));
    };
    if (selectedChat) {
      polulateMessages();
      socket.emit("join chat", selectedChat._id);
    }

  }, [selectedChat,accessToken]);

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
      if (!selectedChat || selectedChat._id !== newMessageRecieved.chat._id) {  
        const currentNotificationCount =
          notificationState[newMessageRecieved.chat._id] || 0;
        dispatch(
          setNotificationState({
            [newMessageRecieved.chat._id]: currentNotificationCount + 1,
          })
        );
      } else if(selectedChat._id === newMessageRecieved.chat._id){
        setMessages([...messages, newMessageRecieved]);
      }
    };
    socket.on("message recieved", onMessageRecieved);

    return ()=>socket.off("message recieved", onMessageRecieved)
  });

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
