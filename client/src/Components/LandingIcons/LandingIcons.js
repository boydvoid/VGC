import React from 'react'

const LandingIcons = (props) => (
  <div className="landing-icons">
    <i className={props.icon}></i>
    <h3>{props.title}</h3>
  </div>
)

export default LandingIcons;