import React from 'react'

const LandingText = (props) => (
  <div className={props.class}>
    <h1>{props.topText}<br/>{props.bottomText} </h1>
    <p>{props.smallText}</p>
  </div>
)

export default LandingText;