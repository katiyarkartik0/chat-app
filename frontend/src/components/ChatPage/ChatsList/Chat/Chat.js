import React, { useMemo } from "react";
import "./Chat.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotificationState,
  getSelectedChat,
  getUserData,
} from "helpers/selectors";
import { setSelectedChat } from "store/slices/chatSlice";

const Chat = ({ chat = {}, notification }) => {
  const userData = useSelector(getUserData);
  const dispatch = useDispatch();
  const selectedChat = useSelector(getSelectedChat);
  const notificationState = useSelector(getNotificationState);

  const handleClick = () => {
    dispatch(setSelectedChat(chat));
  };

  const { name, email } = useMemo(() => {
    const { isGroupChat } = chat;
    if (isGroupChat) {
      const { chatName } = chat;
      return { name: chatName, secondaryText: "" };
    }
    const { users } = chat;
    const currentUser = users.find(({ _id }) => _id != userData._id);
    return {
      name: currentUser?.name,
      email: currentUser?.email,
    };
  }, [chat]);

  const getLatestMessageDisplay = () => {
    let latestMessage = chat.latestMessage?.content;
    const { isGroupChat } = chat;
    if (isGroupChat && latestMessage) {
      const { sender: { email = "" } = "" } = chat.latestMessage;
      latestMessage = email + ": " + latestMessage;
    }
    return latestMessage;
  };

  return (
    <button
      className={`clickable-tab${
        selectedChat && selectedChat._id === chat._id ? "-selectedChat" : ""
      }`}
      onClick={handleClick}
    >
      <div className="primary-text">{email?email:name}</div>
      <div className="secondary-text">{getLatestMessageDisplay()}</div>
      {notificationState[chat._id] > 0 && (
        <div className="notification">{notificationState[chat._id]}</div>
      )}
    </button>
  );
};

export default Chat;
