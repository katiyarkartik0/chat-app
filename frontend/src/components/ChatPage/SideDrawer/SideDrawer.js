import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { getSearchedChatsAndUsers } from "helpers/selectors";

import "./SideDrawer.css";
import ChatWidget from "components/ChatPage/ChatWidget/ChatWidget";
import { Loader } from "utils/Loader/Loader";

const SideDrawer = ({ showSideDrawer, toggleSideDrawer }) => {
  const searchedChatsAndUsers = useSelector(getSearchedChatsAndUsers);

  useEffect(() => {}, []);

  return (
    <div className={`side-drawer ${showSideDrawer ? "open" : ""}`}>
      <div className="header">
        {!searchedChatsAndUsers && <Loader />}
        {searchedChatsAndUsers && <h3>People And Rooms</h3>}
        <button className="close-btn" onClick={toggleSideDrawer}>
          &times;
        </button>
      </div>
      <div className="search-result-list">
        {searchedChatsAndUsers &&
          searchedChatsAndUsers.map((searchItem) => (
            <ChatWidget
              chatItem={searchItem}
              key={searchItem._id}
              isClickable={true}
            />
          ))}
      </div>
    </div>
  );
};

export default SideDrawer;
