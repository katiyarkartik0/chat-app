import React, { useState } from 'react';

import "./ChatPage.css"
import Header from '../../components/ChatPage/Header/Header';
import FriendList from '../../components/ChatPage/FriendList/FriendList';
import ChatBox from '../../components/ChatPage/ChatBox/ChatBox';
import SideDrawer from '../../components/ChatPage/SideDrawer/SideDrawer';

const ChatPage = () => {
  // You can manage state and logic for the side drawer here if needed
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  return (
    <div className="chat-page">
      <Header setShowSideDrawer={setShowSideDrawer}/>
      <div className="chat-container ">
        <div className="friends-list">
          <FriendList />
        </div>
        <div className="chat-box">
          <ChatBox />
        </div>
      </div>
      {/* Conditionally render the SideDrawer component based on state */}
      {<SideDrawer showSideDrawer={showSideDrawer} setShowSideDrawer={setShowSideDrawer}/>}
      {/* <SideDrawer /> */}
    </div>
  );
};

export default ChatPage;
