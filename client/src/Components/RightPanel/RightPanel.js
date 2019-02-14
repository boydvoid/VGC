import React from 'react';
import './RightPanel.css';
import Button from '../Button/Button';
const RightPanel = (props) => (
  <div id="mySidenav" class="sidenav">
  <Button text ="&times;" onclick = {props.closeRightPanel} class="closebtn"/>
</div>

)

export default RightPanel;