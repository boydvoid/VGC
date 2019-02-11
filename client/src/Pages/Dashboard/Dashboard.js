import React, { Component } from 'react'
import LoginAPI from '../../utils/loginAPI';
import Button from '../../Components/Button/Button';

class Dashboard extends Component {

  componentWillMount = () => {
    this.checkLogin();
  }

  checkLogin = event => {
    LoginAPI.checkLogin().then(user => {
      console.log(user);
    })
  }

  logout = () => {
    LoginAPI.logout().then(data => {
      window.location.reload();
    });
  }
  render() {
    return (
      <div>
        <Button text="Logout" onclick={this.logout} />
      </div>
    )

  }
}


export default Dashboard;