import React, { Component } from 'react'
import Button from '../../Components/Button/Button';
import userAPI from '../../utils/userAPI'
import './ThemeSelect.css'
import LightBG from '../../assets/LightTheme.png';
import DarkBG from '../../assets/DarkTheme.png';
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
      <div className="row"> 
        <div className="col-xl-6 left" >
          <img className="theme-img" src={LightBG} alt=""/>
          <Button text="Light Theme"  onclick={this.selectLightTheme}/>
        </div>
        <div className="col-xl-6 right">
          <img className="theme-img" src={DarkBG} alt=""/>
          <Button text="Dark Theme" onclick={this.selectDarkTheme}/>
        </div>
      </div>
    )
  }
}

export default ThemeSelect;