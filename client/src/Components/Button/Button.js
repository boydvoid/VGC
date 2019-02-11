import React from 'react'

const Button = (props) => (
  <button type={props.type} onClick={props.onclick} className={`btn btn-primary ${props.class}`} id={props.id} data-toggle={props.toggle} data-target={props.target}>{props.text}</button>
)

export default Button;