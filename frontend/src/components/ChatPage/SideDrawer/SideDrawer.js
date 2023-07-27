import React, { useState } from 'react';
import './SideDrawer.css';
import { useSelector } from 'react-redux';
import SearchResult from '../Header/SearchResult/SearchResult';

const SideDrawer = ({showSideDrawer,setShowSideDrawer}) => {

  const searchedChatsAndUsers = useSelector((state)=>state.search.searchedChatsAndUsers);

  return (
    <div className={`side-drawer ${showSideDrawer?"open":""}`}>
      <div className="header">
        <h3>People</h3>
        <button className="close-btn" onClick={()=>setShowSideDrawer(false)}>
          &times;
        </button>
      </div>
      <ul>
        {searchedChatsAndUsers.map((searchItem) => (
          <SearchResult searchItem={searchItem} key={searchItem._id}/>
        ))}
      </ul>
    </div>
  );
};

export default SideDrawer;
