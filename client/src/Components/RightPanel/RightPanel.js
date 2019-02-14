import React from 'react';
import './RightPanel.css';
import Button from '../Button/Button';
const RightPanel = (props) => (
  <div id="mySidenav" class="sidenav">
  <Button text ="&times;" onclick = {props.closeRightPanel} class="closebtn"/>
  <form>
    <input id="gameSearch" type="text" placeholder="Search" name="search"/>
    <Button class="search-btn" type="submit" text={<i class="fas fa-search"></i>} onclick={""}/>
  </form>

  <div className="searchResults">
         
  </div>

</div>

)

export default RightPanel;