import React, { useCallback, useMemo } from "react";
import "./Chat.css";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedChat, getUserData } from "helpers/selectors";
import { setSelectedChat } from "store/slices/chatSlice";
import { RoomDropdown } from "components/Dropdown/RoomDropdown";

const Chat = ({ chat = {} }) => {
  const userData = useSelector(getUserData);
  const dispatch = useDispatch();
  const selectedChat = useSelector(getSelectedChat);

  const handleClick = () => {
    dispatch(setSelectedChat(chat));
  };

  const { primaryText, secondaryText } = useMemo(() => {
    const { isGroupChat } = chat;
    if (isGroupChat) {
      const { chatName } = chat;
      return { primaryText: chatName, secondaryText: "" };
    }
    const { users } = chat;
    const currentUser = users.find(({ _id }) => _id != userData._id);
    return {
      primaryText: currentUser?.name,
      secondaryText: currentUser?.email,
    };
  }, [chat]);

  return (
      <button
        className={`clickable-tab${
          selectedChat && selectedChat._id == chat._id ? "-selectedChat" : ""
        }`}
        onClick={handleClick}
      >
          <div className="primary-text">{primaryText}</div>
          <div className="secondary-text">{secondaryText}</div>
        </button>
  );
};

export default Chat;
