import React, { Suspense, useState } from "react";
import { useSelector } from "react-redux";

import Header from "components/ChatPage/Header/Header";
import ChatBox from "components/ChatPage/ChatBox/ChatBox";
import SideDrawer from "components/ChatPage/SideDrawer/SideDrawer";
import UnauthorizedPage from "pages/unauthorizedPage/UnauthorizedPage";

import { getAccessToken } from "helpers/selectors";

import { Loader } from "utils/Loader/Loader";

import "./ChatPage.css";

const ChatsList = React.lazy(() =>
  import("components/ChatPage/ChatsList/ChatsList")
);

const ChatPage = () => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const accessToken = useSelector(getAccessToken);
  const [search, setSearch] = useState("");

  const toggleSideDrawer = () => {
    setShowSideDrawer((prev) => !prev);
  };

  const updateSearch = (search) => {
    setSearch(search);
  };
console.log(process.env,"jjjjj")
  if (accessToken) {
    return (
      <div className="chat-page">
        <Header
          setShowSideDrawer={setShowSideDrawer}
          updateSearch={updateSearch}
        />
        <div className="chat-container ">
          <div className="friends-list">
            <Suspense fallback={<Loader />}>
              <ChatsList />
            </Suspense>
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
  return <UnauthorizedPage />;
};

export default ChatPage;
