import React from "react";
import "./Chat.css";
import Button from "../Button/Button";

const ChatMessages = props => (
  <div className="chatSection">
    <div className="messagesSection" id="chatMessages">
      {props.chatMessages.map(messages => {
        console.log(messages)
        return (
          <div className="msgs">
            <div
              className={
                messages.sender === props.username ? "msgYou" : "msgNotYou"
              }
            >
              <h3>{messages.sender}</h3>
              <p id="msgs">{messages.message}</p>
            </div>
          </div>
        );
      })}
    </div>
    <div className="messagesForm">
      <form className="d-flex">
        <input
          type="text"
          id="chatInput"
          name="sInputChat"
          onChange={props.handleChange}
        />
        <Button
          type="submit"
          onclick={props.sendMsg}
          text={<i className="fas fa-angle-double-right" />}
          class="sendChatBtn"
          chatid={props.chatMessages.chatId}
          username={props.username}
          userSpeakingWith={props.userSpeakingWith}
          id="sendChatBtn"
        />
      </form>
    </div>
  </div>
);

export default ChatMessages;
