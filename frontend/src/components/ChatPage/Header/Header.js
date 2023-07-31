import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  setSearchedChatsAndUsers,
} from "store/slices/searchSlice";
import { userRequest } from "api/user";
import { searchRooms } from "api/chat";

import { getAccessToken, getUserData } from "helpers/selectors";

import "./Header.css";
import Button from "components/Button/Button";
import { persistor } from "index";

const Header = ({ setShowSideDrawer }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector(getAccessToken);
  const userData = useSelector(getUserData);
  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    persistor.purge();
    navigate("/");
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    let searchResults = [];
    setShowSideDrawer(true);
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

    await searchRooms({ accessToken, search })
      .then(async (res) => {
        const searchResult = await res.json();
        searchResults = [...searchResults, ...searchResult];
      })
      .catch((err) => alert(err));
    dispatch(setSearchedChatsAndUsers(searchResults));
  };

  return (
    <div className="header">
      <form className="search-bar" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search people or rooms"
          onChange={handleSearch}
          value={search}
        />
        <Button type="submit" text="Search" />
      </form>
      <div className="profile-dropdown">
        <Button
          type="click"
          text={userData.name}
          onClickEvent={handleToggleDropdown}
        />

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
