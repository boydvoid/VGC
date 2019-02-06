import React from 'react'

const LandingIcons = (props) => (
  <div>
    <i className={props.icon}></i>
    <h3>{props.title}</h3>
  </div>
)

export default LandingIcons;