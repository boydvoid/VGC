import React from 'react'

const Button = (props) => (
  <button className={`btn btn-primary ${props.class}`}>{props.text}</button>
)

export default Button;