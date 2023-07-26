import React from "react";
import "./Chat.css";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChat } from "../../../../store/slices/chatSlice";

const Chat = ({ chat = {} }) => {
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setSelectedChat(chat));
  };

  return (
    <button className="clickable-tab" onClick={handleClick}>
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
