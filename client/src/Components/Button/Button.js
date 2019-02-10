import React from 'react'

const Button = (props) => (
  <button onClick={props.onclick} className={`btn btn-primary ${props.class}`} id={props.id} data-toggle={props.toggle} data-target={props.target}>{props.text}</button>
)

export default Button;