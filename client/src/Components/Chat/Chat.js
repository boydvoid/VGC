import React from "react";
import "./Chat.css";
import ChatList from "./ChatList";
import ChatMessages from "./ChatMessages";
import Button from "../Button/Button";

const Chat = props => (
  <div className={props.chatExpanded ? `chatbox chatExpanded` : `chatbox`}>
    <div
      className={`chat-title ${props.titleColor}`}
      onClick={props.chatListDisplay ? props.titleClick : null}
    >
      {props.chatListDisplay ? (
        <h3>Chat</h3>
      ) : (
        <div className="titleBarDiv">
          <Button
            text={<i className="fas fa-arrow-left" />}
            class="backBtn"
            onclick={props.toggleChatDisplay}
          />
          <h3>{props.userSpeakingWith}</h3>
          <div className="minimizeBtn" onClick={props.titleClick}>
            <i className="fas fa-window-minimize" />
          </div>
        </div>
      )}
    </div>

    {/* chat content either list of contacts or messages */}
    {props.chatListDisplay ? (
      <ChatList
        usersChats={props.usersChats}
        username={props.username}
        toggleChatDisplay={props.toggleChatDisplay}
      />
    ) : (
      <ChatMessages
        handleChange={props.handleChange}
        chatMessages={props.chatMessages}
        username={props.username}
        userSpeakingWith={props.userSpeakingWith}
        sendMsg={props.sendMsg}
      />
    )}
  </div>
);

export default Chat;
