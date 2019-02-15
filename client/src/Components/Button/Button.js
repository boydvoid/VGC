import React from 'react'
import './Button.css'
const Button = (props) => (
  <button 
    type={props.type}
    onClick={props.onclick} 
    className={`btn btn-primary ${props.class}`} 
    id={props.id} data-toggle={props.toggle} 
    data-target={props.target}
    data-id={props.dataId}
    data-name={props.dataName}
    data-url={props.dataUrl}
    
  >{props.text}</button>
)

export default Button;