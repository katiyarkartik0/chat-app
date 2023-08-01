import React, { useState } from "react";
import { useSelector } from "react-redux";

import Header from "components/ChatPage/Header/Header";
import ChatsList from "components/ChatPage/ChatsList/ChatsList";
import ChatBox from "components/ChatPage/ChatBox/ChatBox";
import SideDrawer from "components/ChatPage/SideDrawer/SideDrawer";
import UnauthorizedPage from "pages/unauthorizedPage/UnauthorizedPage";

import { getAccessToken } from "helpers/selectors";

import "./ChatPage.css";

const ChatPage = () => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const accessToken = useSelector(getAccessToken);
  const [search,setSearch] = useState("");

  const toggleSideDrawer = () =>{
    setShowSideDrawer((prev)=>!prev)
  }

  const updateSearch=(search) =>{
    setSearch(search)
  }

  if(accessToken){
    return (
      <div className="chat-page">
        <Header setShowSideDrawer={setShowSideDrawer} updateSearch={updateSearch}/>
        <div className="chat-container ">
          <div className="friends-list">
            <ChatsList />
          </div>
          <div className="chat-box">
            <ChatBox />
          </div>
        </div>
        {
          <SideDrawer
            showSideDrawer={showSideDrawer}
            toggleSideDrawer={toggleSideDrawer}
            search={search}
          />
        }
      </div>
    );
  }
  return <UnauthorizedPage/>

 
};

export default ChatPage;
