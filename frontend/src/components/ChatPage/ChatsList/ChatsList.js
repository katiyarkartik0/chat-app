import React, { useEffect, useState } from "react";
import { chatRequest } from "../../../api/chat";
import { useDispatch, useSelector } from "react-redux";
import Chat from "./Chat/Chat";
import "./ChatList.css";
import { setAllChats } from "../../../store/slices/chatSlice";

const ChatsList = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats.allChats);

  useEffect(() => {
    const fetchChats = async () => {
      const res = await chatRequest({
        attempt: "fetchChats",
        headers: { authorization: `JWT ${accessToken}` },
        method: "GET",
      });
      if (res.ok) {
        const response = await res.json();
        dispatch(setAllChats(response));
      }
    };
    fetchChats();
  }, [accessToken, userData]);

  const rooms = [];
  const oneOnOnechats = chats.map((chat) => {
    if (!chat.isGroupChat) {
      return <Chat chat={chat} key={chat._id} />;
    }
    else{
      rooms.push(<Chat chat={chat} key={chat._id} />);
    }
  })

  return (
    <div className="chats-list-container">
      <h2>ROOMS</h2>
      <ul>
        {rooms}
      </ul>
      <br></br>
      <h2>Chats List</h2>
      <ul>
        {oneOnOnechats}
      </ul>
    </div>
  );
};

export default ChatsList;
