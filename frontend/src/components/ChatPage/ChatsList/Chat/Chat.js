import React from "react";
import "./Chat.css";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedChat, getUserData } from "helpers/selectors";
import { setSelectedChat } from "store/slices/chatSlice";
// import { setSelectedChat } from "../../../../store/slices/chatSlice";
// import { getSelectedChat } from "../../../../helpers/selectors";

const Chat = ({ chat = {} }) => {
  const userData = useSelector(getUserData);
  const dispatch = useDispatch();
  const selectedChat = useSelector(getSelectedChat);

  const handleClick = () => {
    dispatch(setSelectedChat(chat));
  };

  return (
    <button
      className={`clickable-tab${
        selectedChat && selectedChat._id == chat._id ? "-selectedChat" : ""
      }`}
      onClick={handleClick}
    >
      <div className="primary-text">
        {chat.isGroupChat
          ? chat.chatName
          : chat.users.find((user) => user._id != userData._id)?.name}
      </div>
      <div className="secondary-text">
        {chat.isGroupChat
          ? ""
          : chat.users.find((user) => user._id != userData._id)?.email}
      </div>
    </button>
  );
};

export default Chat;
