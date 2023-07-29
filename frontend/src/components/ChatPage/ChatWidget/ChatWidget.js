import { useDispatch, useSelector } from "react-redux";
import { addToAllChats, setSelectedChat } from "store/slices/chatSlice";
import { chatRequest } from "api/chat";
import { getAccessToken, getAllChats } from "helpers/selectors";

import "./ChatWidget.css";

const ChatWidget = ({ chatItem,isClickable }) => {
  const dispatch = useDispatch();
  const accessToken = useSelector(getAccessToken);
  const allChats = useSelector(getAllChats);

  const handleClick = async () => {
    if(!isClickable){
      return;
    }
    if (!chatItem.isGroupChat) {
      const res = await chatRequest({
        attempt: "accessChats",
        method: "POST",
        headers: {
          authorization: `JWT ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recieverUserId: chatItem._id }),
      });
      if (res.ok) {
        const response = await res.json();
        dispatch(setSelectedChat(response));
        const newChat = allChats.find((chat) => chat._id == response._id);
        if (!newChat) {
          dispatch(addToAllChats(response));
        }
      }
    }
    if (chatItem.isGroupChat) {
      const res = await chatRequest({
        attempt: "accessRoom",
        method: "POST",
        headers: {
          authorization: `JWT ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roomName: chatItem.chatName }),
      });
      if (res.ok) {
        const response = await res.json();
        dispatch(setSelectedChat(response));
        const newChat = allChats.find((chat) => chat._id === response._id);
        if (!newChat) {
          dispatch(addToAllChats(response));
        }
      }
    }
  };
  return (
    <>
      <button className="clickable-tab" onClick={handleClick}>
        <div className="primary-text">
          {chatItem.isGroupChat ? chatItem.chatName : chatItem.name}
        </div>
        <div className="secondary-text">
          {chatItem.isGroupChat ? "ROOM" : chatItem.email}
        </div>
      </button>
    </>
  );
};

export default ChatWidget;
