import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setLogout } from "store/slices/authSlice";
import { setSearchToDefault, setSearchedChatsAndUsers } from "store/slices/searchSlice";
import { userRequest } from "api/user";
import { chatRequest } from "api/chat";

import { getAccessToken } from "helpers/selectors";

import "./Header.css";
import { setChatsToDefault } from "store/slices/chatSlice";

const Header = ({ setShowSideDrawer }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector(getAccessToken);
  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    dispatch(setLogout());
    dispatch(setChatsToDefault());
    dispatch(setSearchToDefault());
    navigate("/");
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = async(e) => {
    e.preventDefault();
    let searchResults = [];
    await userRequest({
      attempt: "search",
      method: "GET",
      headers: { authorization: `JWT ${accessToken}` },
      params: `?user=${search}`,
    }).then(async (res) => {
      if (res.ok) {
        const searchResult = await res.json();
        searchResults = [...searchResults, ...searchResult];
      }
    });

    await chatRequest({
      attempt: "search",
      method: "GET",
      headers: { authorization: `JWT ${accessToken}` },
      params: `?chatName=${search}`,
    }).then(async (res) => {
      if (res.ok) {
        const searchResult = await res.json();
        searchResults = [...searchResults, ...searchResult];
      }
    });

    dispatch(setSearchedChatsAndUsers(searchResults));
    setShowSideDrawer(true);
  };

  return (
    <div className="header">
      <form className="search-bar" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search people"
          onChange={handleSearch}
          value={search}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <div className="profile-dropdown">
        <button className="dropdown-toggle-btn" onClick={handleToggleDropdown}>
          Profile
        </button>
        {showDropdown && (
          <div className="dropdown-content">
            <button className="settings-btn">Settings</button>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
