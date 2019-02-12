import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button/Button';
import './Searchbar.css'
const Searchbar = (props) => (

  <nav class="searchbar">
    <div>
      <i class="fas fa-search"></i> <input type="text" placeholder="Search..."/>
    </div>
    <span className="ml-auto">
    <input type="checkbox" id="switch"onChange={props.toggleTheme} /><label for="switch" >Toggle</label>
    </span>
  </nav>
)

export default Searchbar;