import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button/Button';
const Nav = () => (

  <nav class="navbar">
    <Link to="/" className="navbar-brand logo">VGC<span className="logo-dot">.</span></Link>
    <Button class="login-btn" text="Login" toggle="modal" target="#loginModal" />
  </nav>
)

export default Nav;