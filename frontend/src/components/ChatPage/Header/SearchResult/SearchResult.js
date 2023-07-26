import { useDispatch, useSelector } from "react-redux";
import "./SearchResult.css";
import { setSelectedChat } from "../../../../store/slices/chatSlice";
import { chatRequest } from "../../../../api/chat";

const SearchResult = ({ searchItem }) => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const handleClick = async () => {
    if (!searchItem.isGroupChat) {
      const res = await chatRequest({
        attempt: "accessChats",
        method: "POST",
        headers: {
          authorization: `JWT ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recieverUserId: searchItem._id }),
      });
      console.log(res);
      if (res.ok) {
        const response = await res.json();
        console.log(response)
        dispatch(setSelectedChat(response));
      }
    }
  };
  return (
    <>
      <button className="clickable-tab" onClick={handleClick}>
        <div className="primary-text">
          {searchItem.isGroupChat ? searchItem.chatName : searchItem.name}
        </div>
        <div className="secondary-text">
          {searchItem.isGroupChat ? "ROOM" : searchItem.email}
        </div>
      </button>
    </>
  );
};

export default SearchResult;
