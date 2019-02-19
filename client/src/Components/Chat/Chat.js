import React from "react";
import "./Chat.css";
import ChatList from "./ChatList";
import ChatMessages from "./ChatMessages";

const Chat = props => (
  <div className={props.chatExpanded ? `chatbox chatExpanded` : `chatbox`}>
    <div
      className={`chat-title ${props.titleColor}`}
      onClick={props.titleClick}
    >
      <h3>Chat</h3>
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
