import { createPortal } from "react-dom";
import "./Modal.css";
import { chatRequest } from "api/chat";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "helpers/selectors";
import { addToAllChats } from "store/slices/chatSlice";
import Button from "components/Button/Button";

const defaultRoomStatus = {
  showRoomStatus: false,
  created: false,
  msg: "",
};

export const Modal = ({ toggleModal }) => {
  const [roomName, setRoomName] = useState("");
  const accessToken = useSelector(getAccessToken);
  const [roomStatus, setRoomStatus] = useState(defaultRoomStatus);
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
    }).then(async (res) => {
      const response = await res.json();
      if (res.ok) {
        dispatch(addToAllChats(response));
        setRoomStatus({
          showRoomStatus: true,
          created: true,
          msg: "Room has been successfully created",
        });
        setRoomName("");
        return;
      } else {
        setRoomStatus({
          showRoomStatus: true,
          created: false,
          msg: response.msg,
        });

        setTimeout(() => {
          setRoomStatus(defaultRoomStatus);
        }, 3000);
      }
    });
  };

  const handleRoomName = (e) => {
    setRoomName(e.target.value);
  };

  const getModalStatusClassName = () => {
    const { created, showRoomStatus, msg } = roomStatus;
    let className = "";
    if (created) {
      className += "success-message";
    } else {
      className += "failed-message";
    }
    if (showRoomStatus) {
      className += " active";
    }
    return className;
  };

  return createPortal(
    <>
      <div className="modal-container">
        <div className="modal-background" id="modalBackground">
          <div className="modal" id="modal">
            <div className="modal-content">
              <span
                className="close-btn"
                id="closeModalBtn"
                onClick={handleClick}
              >
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
                <Button type="submit" text="Submit" />
              </form>
              <br></br>
              {
                <div className={getModalStatusClassName()}>
                  {roomStatus.msg}
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </>,
    document.querySelector(".portalModal")
  );
};
