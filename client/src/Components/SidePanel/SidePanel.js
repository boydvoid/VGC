import React from 'react'
import './SidePanel.css'
import Button from '../Button/Button';
const SidePanel = (props) => (
  <nav className="sidebar">
    <p>sidebar</p>
    <div className="roundImg" style={{background: `url(${props.profileImg})`}}></div>
    <p>{props.username}</p>
    <Button text={props.buttonText} onclick={props.buttonClick}/>
  </nav>
)

export default SidePanel;