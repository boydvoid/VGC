import React from "react";
import "./Chat.css";
import Button from "../Button/Button";

const Chat = props => (
  <div className={props.chatExpanded ? `chatbox chatExpanded` : `chatbox`}>
    <div
      className={`chat-title ${props.titleColor}`}
      onClick={props.titleClick}
    >
      <h3>Chat</h3>
    </div>
    <form>
      <input type="text" id="chatInput" />
      <Button onclick={props.sendMsg} text="Send" class="sendChatBtn" />
    </form>

    {props.chatMessages.map(messages => {
      return (
        <div>
          <h3>{messages.sender}</h3>
          <p>{messages.message}</p>
        </div>
      );
    })}
  </div>
);

export default Chat;
