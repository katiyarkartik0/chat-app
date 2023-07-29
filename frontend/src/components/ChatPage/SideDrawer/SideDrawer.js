import React from "react";
import { useSelector } from "react-redux";

import { getSearchedChatsAndUsers } from "helpers/selectors";

import "./SideDrawer.css";
import ChatWidget from "components/ChatPage/ChatWidget/ChatWidget";

const SideDrawer = ({ showSideDrawer, toggleSideDrawer }) => {
  const searchedChatsAndUsers = useSelector(getSearchedChatsAndUsers);


  return (
    <div className={`side-drawer ${showSideDrawer ? "open" : ""}`}>
      <div className="header">
        <h3>People</h3>
        <button className="close-btn" onClick={toggleSideDrawer}>
          &times;
        </button>
      </div>
      <div className="search-result-list">
        {searchedChatsAndUsers && searchedChatsAndUsers.map((searchItem) => (
          <ChatWidget chatItem={searchItem} key={searchItem._id} />
        ))}
      </div>
    </div>
  );
};

export default SideDrawer;
