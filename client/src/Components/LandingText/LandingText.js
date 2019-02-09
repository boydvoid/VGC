import React from 'react'
import Button from '../Button/Button'
const LandingText = (props) => (
  <div className={props.class}>
    <h1>{props.topText}<br />{props.bottomText} </h1>
    <p>{props.smallText}</p>
    {props.button ? <Button text={props.buttonText} toggle={props.toggle} /> : ""}
  </div>
)

export default LandingText;