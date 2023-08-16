import { Loader } from "utils/Loader/Loader";
import "./ChatBar.css";
import Button from "components/Button/Button";
import { getAccessToken, getSelectedChat } from "helpers/selectors";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { sendMessage } from "api/message";
import { socket } from "components/../socket";
import { putFileDataInAWSS3 } from "api/AWS/fileData";

const defaultMessageState = { text: "", file: "" };

const ChatBar = ({ messages, setMessages }) => {
  const selectedChat = useSelector(getSelectedChat);
  const accessToken = useSelector(getAccessToken);
  const [newMessage, setNewMessage] = useState(defaultMessageState);
  const [isMessageSending, setIsMessageSending] = useState(false);
  const inputRef = useRef(null);

  const handleText = (e) => {
    setNewMessage((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileUpload = (e) => {
    setNewMessage((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsMessageSending(true);

    await sendMessage({
      messageBody: JSON.stringify({
        content: newMessage?.text,
        chatId: selectedChat?._id,
        contentType: newMessage?.file?.type,
        fileName: newMessage?.file?.name,
      }),
      accessToken,
    })
      .then(async (res) => {
        const response = await res.json();
        const { message, preSignedPUTUrl } = await response;
        if (preSignedPUTUrl) {
          await putFileDataInAWSS3({
            preSignedUrl: preSignedPUTUrl,
            requestBody: newMessage.file,
            contentType: newMessage.file.type,
          });
        }
        setMessages([...messages, message]);
        setNewMessage(defaultMessageState);
        inputRef.current.value = "";
        socket.emit("new message", message);
      })
      .catch((err) => alert(err));

    setIsMessageSending(false);
  };

  const uploadFileButtonName = useCallback(() => {
    let name = newMessage?.file?.name;
    if (name) {
      name = name.substring(0, 11);
    } else {
      name = "upload file";
    }
    return name;
  }, [newMessage]);

  const handleCancelFileUpload = () => {
    setNewMessage((prev) => ({ ...prev, file: "" }));
    inputRef.current.value = "";
  };

  return (
    <form
      className="chat-input"
      onSubmit={handleSubmit}
      enctype="multipart/form-data"
    >
      <div className="file-upload-container">
        <label
          className={`label-file-upload ${newMessage.file ? "disabled" : ""}`}
          for="file-upload-input"
        >
          {uploadFileButtonName()}
        </label>
        <input
          disabled={newMessage.file ? true : false}
          type="file"
          className="file-upload-input"
          id="file-upload-input"
          onChange={handleFileUpload}
          ref={inputRef}
          hidden
        ></input>
      </div>
      <div
        onClick={handleCancelFileUpload}
        className={`cancel-icon${newMessage.file ? "-active" : ""}`}
      >
        &#10006;
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        onChange={handleText}
        value={newMessage.text}
        className="message-input"
        name="text"
      />
      {isMessageSending ? <Loader /> : <Button type="submit" text="Send" />}
    </form>
  );
};

export default ChatBar;
