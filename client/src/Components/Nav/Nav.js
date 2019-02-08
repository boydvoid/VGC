import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button/Button';
const Nav = () => (
  <nav>
    <Link to="/" className="logo">VGC</Link>
    <Button class="login-btn" text="Login" />
  </nav>
)

export default Nav;