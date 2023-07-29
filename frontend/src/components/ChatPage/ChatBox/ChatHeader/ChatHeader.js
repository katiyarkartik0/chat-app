import React, { useEffect, useState } from "react";
import "./ChatHeader.css"; // Import the CSS file
import { useSelector } from "react-redux";
import { getSelectedChat, getUserData } from "helpers/selectors";
import ChatWidget from "components/ChatPage/ChatWidget/ChatWidget";

const ChatHeader = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { isGroupChat, chatName, users,_id:chatId } = useSelector(getSelectedChat);
  const userData = useSelector(getUserData);

  useEffect(()=>{
    setShowDropdown(false)
  },[chatId])
  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };
  const getChatName = () => {
    if (isGroupChat) {
      return chatName;
    }
    return users.find((user) => user._id !== userData._id)?.name || "";
  };

  return (
    <header className="chat-header">
      <h2>{getChatName()}</h2>

      {isGroupChat && (
        <div className="dropdown-container">
          <div className="dropdown-button" onClick={toggleDropdown}>
            <div className="dots"></div>
            <div className="dots"></div>
            <div className="dots"></div>
          </div>
          {showDropdown && (
            <ul className="dropdown-list">
              {users.map((user, index) => (
                <ChatWidget
                  isClickable={user._id == userData._id ? false : true}
                  chatItem={user}
                  key={user._id}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </header>
  );
};

export default ChatHeader;
