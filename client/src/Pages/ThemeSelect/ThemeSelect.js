import React, { Component } from 'react'
import Button from '../../Components/Button/Button';
import userAPI from '../../utils/userAPI'

class ThemeSelect extends Component {
  //change theme in database
  selectLightTheme = () => {

    //change theme in database
    let data = {
      theme: 1
    }
    userAPI.update(data).then(done => {
      window.location.reload();
    })
  }

  selectDarkTheme = () => {
    //change theme in database
  let data = {
      theme: 2
    }
    userAPI.update(data).then(done => {
      window.location.reload();
    })
    
  }
  render () {
    return (
      <div> 
        <Button text="Light Theme"  onclick={this.selectLightTheme}/>
        <Button text="Dark Theme" onclick={this.selectDarkTheme}/>
      </div>
    )
  }
}

export default ThemeSelect;