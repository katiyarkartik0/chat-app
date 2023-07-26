import { useSelector } from "react-redux";
import "./Message.css";
import React from "react";

const Message = ({ message }) => {
  const userData = useSelector((state) => state.auth.userData);
  const { sender, content, createdAt } = message;
  const isSentByUser = sender._id == userData._id;
  const messageClassName = isSentByUser ? "sent-by-user" : "sent-by-buddy";
  return (
      <div className={`message ${messageClassName}`}>
        <div className={`name-${messageClassName}`}>{sender.name}</div>
        <div className={`content-${messageClassName}`}>{content}</div>
        <div className={`time-${messageClassName}`}>{createdAt}</div>
      </div>
  );
};

export default Message;
