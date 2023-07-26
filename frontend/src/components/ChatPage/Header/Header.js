import React, { useState } from "react";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { userRequest } from "../../../api/user";
import { chatRequest } from "../../../api/chat";
import { setSearchedChatsAndUsers } from "../../../store/slices/searchSlice";

const Header = ({ setShowSideDrawer }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/");
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    let searchResults = [];
    const res = await userRequest({
      attempt: "search",
      method: "GET",
      headers: { authorization: `JWT ${accessToken}` },
      params: `?user=${search}`,
    });
    console.log(res);
    if (res.ok) {
      const response = await res.json();
      searchResults = [...searchResults, ...response];
      console.log(response);
    }

    const res2 = await chatRequest({
      attempt: "search",
      method: "GET",
      headers: { authorization: `JWT ${accessToken}` },
      params: `?chatName=${search}`,
    });
    if (res2.ok) {
      const response = await res2.json();
      searchResults = [...searchResults, ...response];
      console.log(response);
    }
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
