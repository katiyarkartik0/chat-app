import { createPortal } from "react-dom";
import "./Modal.css";
import { chatRequest } from "api/chat";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "helpers/selectors";
import { addToAllChats } from "store/slices/chatSlice";

export const Modal = ({ toggleModal }) => {
  const [roomName, setRoomName] = useState("");
  const accessToken = useSelector(getAccessToken);
  const dispatch = useDispatch();
  const handleClick = () => {
    toggleModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await chatRequest({
      method: "POST",
      attempt: "createRoom",
      headers: {
        authorization: `JWT ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomName }),
    }).then(async(res)=>{
      const response = await res.json();
      if(res.ok){
        dispatch(addToAllChats(response))
        setRoomName("");
      }
    })
  };

  const handleRoomName = (e)=>{
    setRoomName(e.target.value)
  }

  return createPortal(
    <>
      <div className="modal-container">
        <div className="modal-background" id="modalBackground">
          <div className="modal" id="modal">
            <div className="modal-content">
              <span className="close-btn" id="closeModalBtn" onClick={handleClick}>
                &times;
              </span>
              <form id="roomForm" onSubmit={handleSubmit}>
                <label for="roomName">Room Name:</label>
                <input
                  type="text"
                  id="roomName"
                  name="roomName"
                  placeholder="Enter room name"
                  required
                  value={roomName}
                  onChange={handleRoomName}
                />
                <button className="modal-submit-button" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.querySelector(".portalModal")
  );
};
