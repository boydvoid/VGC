import React, { Component } from 'react'
import LoginAPI from '../../utils/loginAPI';
import Button from '../../Components/Button/Button';

class Dashboard extends Component {

  logout = () => {
    LoginAPI.logout().then(data => {
      //reload the window on sucessful logout
      window.location.reload();
    });
  }
  render() {
    return (
      <div>
        <p>{this.props.username}</p>
        <p>{this.props.email}</p>
        <p>{this.props.theme}</p>
        <Button text="Logout" onclick={this.logout} />
      </div>
    )

  }
}


export default Dashboard;