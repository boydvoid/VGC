import React from 'react'
import './SidePanel.css'
import Button from '../Button/Button';
import {Link} from 'react-router-dom'
const SidePanel = (props) => (
  <nav className="sidebar">
      <div className="sidebar-logo">
      <Link to="/" className="navbar-brand logo">VGC<span className="logo-dot">.</span></Link>
      </div>
      <div className="roundImg" style={{background: `url(${props.profileImg})`}}></div>
      <p className="secondaryText username">{props.username}</p>

      <ul>
        <li className={props.active === "profile" ? "active" : ""}><Link to="/profile">  <i class="fas fa-user"></i> Profile </Link></li>
        <li className={props.active === "collection" ? "active" : ""}><Link to="/collection"><i class="fas fa-book"></i> Collection</Link></li>
        <li className={props.active === "wishlist" ? "active" : ""}><Link to="/wishlist"><i class="fas fa-list-ol"></i> Wishlist</Link></li>
        <li className={props.active === "sell" ? "active" : ""}><Link to="/sell"><i class="fas fa-tags"></i> Sell List</Link></li>
      </ul>
    <Button class="sidebar-btn" text={props.buttonText} onclick={props.buttonClick}/>
  </nav>
)

export default SidePanel;