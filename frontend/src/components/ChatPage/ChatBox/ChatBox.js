import React from 'react';
import "./ChatBox.css"

const ChatBox = () => {
  return (
    <div className="chat-box-container">
      <div className="messages">
        {/* Your messages will go here */}
      </div>
      <div className="chat-input">
        <input type="text" placeholder="Type your message..." />
        <button type="button" className="send-button">Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
