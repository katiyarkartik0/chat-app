import React from "react";
import { useSelector } from "react-redux";

import SearchResult from "components/ChatPage/Header/SearchResult/SearchResult";
import { getSearchedChatsAndUsers } from "helpers/selectors";

import "./SideDrawer.css";

const SideDrawer = ({ showSideDrawer, setShowSideDrawer }) => {
  const searchedChatsAndUsers = useSelector(getSearchedChatsAndUsers);


  return (
    <div className={`side-drawer ${showSideDrawer ? "open" : ""}`}>
      <div className="header">
        <h3>People</h3>
        <button className="close-btn" onClick={() => setShowSideDrawer(false)}>
          &times;
        </button>
      </div>
      <ul>
        {searchedChatsAndUsers && searchedChatsAndUsers.map((searchItem) => (
          <SearchResult searchItem={searchItem} key={searchItem._id} />
        ))}
      </ul>
    </div>
  );
};

export default SideDrawer;
