import React from "react";
import "./Chat.css";
const truncate = string => {
  console.log(string)
  if (string !== undefined || string !== null || string !== "") {

    if (string.length > 10) return `${string.substring(0, 10)}...`;
    return string;
  }
};

const ChatList = props => (
  <div className="chatList" onClick={props.toggleChatDisplay}>

    {
      props.usersChats.map(chatBox => {
        return (
          <div
            className="chatDiv"

            data-chatid={chatBox._id}
          >
            <div>

              <h2 data-chatid={chatBox._id}>
                {chatBox.user1 === props.username ? chatBox.user2 : chatBox.user1}
              </h2>
            </div>
            {/* on the list show the name of the person you are talking to */}
            <div>

              <p data-chatid={chatBox._id}>{chatBox.gameName}</p>
            </div>
          </div>
        );
      })}
  </div>
);

export default ChatList;
