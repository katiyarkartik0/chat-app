import React, { useState } from 'react';
import './Header.css';

const Header = ({setShowSideDrawer}) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleToggleDropdown = () => {
      setShowDropdown(!showDropdown);
    };
  return (
    <div className="header">
      <div className="search-bar">
        <input type="text" placeholder="Search people" />
        <button type="button" className="search-button" onClick={()=>setShowSideDrawer(true)}>
          Search
        </button>
      </div>
      <div className="profile-dropdown">
        <button className="dropdown-toggle-btn" onClick={handleToggleDropdown}>
          Profile
        </button>
        {showDropdown && (
          <div className="dropdown-content">
            <button className="settings-btn">Settings</button>
            <button className="logout-btn">Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
