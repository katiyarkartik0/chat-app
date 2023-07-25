import React, { useEffect, useState } from "react";
import { chatRequest } from "../../../api/chat";
import { useSelector } from "react-redux";

const FriendList = () => {
  const [chats, setChats] = useState([]);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    const fetchChats = async () => {
      const res = await chatRequest({
        attempt: "fetchChats",
        headers: { authorization: `JWT ${accessToken}` },
        method: "GET",
      });
      if (res.ok) {
        const response = await res.json();
        setChats(response);
      }
    };
    fetchChats();
  }, [accessToken, userData]);

  return (
    <div className="friends-list-container">
      <h2>Friends List</h2>
      <ul>
        {chats.map((chat) => (
          <li key={chat._id}>
            {chat.isGroupChat
              ? chat.chatName
              : chat.users.find((user) => user._id != userData._id).name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendList;
