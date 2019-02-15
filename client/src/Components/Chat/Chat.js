import React from 'react'
import './Chat.css'
import Button from '../Button/Button';
const Chat = (props) => (
  <div className={props.chatExpanded ? `chatbox chatExpanded` : `chatbox`} >
    <div className="chat-title" onClick={props.titleClick}>
      <h3>Chat</h3> 
    </div>  
    <form>
    <input type="text" id="chatInput"/>
    <Button onclick={props.sendMsg} text="Send" class="sendChatBtn"/>
    </form>

    <div id="msgs">
    </div>
  </div>
)

export default Chat;