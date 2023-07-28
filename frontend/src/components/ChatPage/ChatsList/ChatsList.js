import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Chat from "components/ChatPage/ChatsList/Chat/Chat";
import { setAllChats } from "store/slices/chatSlice";
import { chatRequest } from "api/chat";

import { Modal } from "utils/ModalComponent/Modal";
import { getAccessToken, getAllChats, getUserData } from "helpers/selectors";

import "./ChatList.css";

const ChatsList = () => {
  const accessToken = useSelector(getAccessToken);
  const userData = useSelector(getUserData);
  const allChats = useSelector(getAllChats);
  const dispatch = useDispatch();
  const [rooms, setRooms] = useState([]);
  const [oneOnOnechats, setOneOnOneChats] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

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
  }, [accessToken, userData, dispatch]);

  useEffect(() => {
    let oneOnOnechatsList = [];
    let roomsList = [];
    allChats.forEach((chat) => {
      if (!chat.isGroupChat) {
        oneOnOnechatsList = [
          ...oneOnOnechatsList,
          <Chat chat={chat} key={chat._id} />,
        ];
      } else {
        roomsList = [...roomsList, <Chat chat={chat} key={chat._id} />];
      }
    });
    setOneOnOneChats(oneOnOnechatsList);
    setRooms(roomsList);
  }, [allChats]);

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <div className="chats-list-container">
      {isOpenModal && <Modal toggleModal={toggleModal} />}

      <div className="room-list-header">
        <h2>ROOMS</h2>
        <button
          type="click"
          className="create-a-room-button"
          onClick={toggleModal}
        >
          Create a room
        </button>
      </div>
      <br></br>
      <ul>{rooms}</ul>
      <br></br>
      <h2>Chats List</h2>
      <ul>{oneOnOnechats}</ul>
    </div>
  );
};

export default ChatsList;
