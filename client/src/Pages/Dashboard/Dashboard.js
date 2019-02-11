import React, { Component } from 'react'
import userAPI from '../../utils/userAPI';
import Button from '../../Components/Button/Button';
import ThemeSelect from '../ThemeSelect/ThemeSelect'
class Dashboard extends Component {
  state = {
    theme: this.props.theme
  }
  componentWillMount = () => {
  }

  logout = () => {
    userAPI.logout().then(data => {
      //reload the window on sucessful logout
      window.location.reload();
    });
  }
  render() {
    return (
      <div>
        {this.state.theme === 0 
        ?
          <ThemeSelect /> 
        : 

        <div>
          <p>{this.props.username}</p>
          <p>{this.props.email}</p>
          <p>{this.props.theme}</p>
          <Button text="Logout" onclick={this.logout} />
        </div>

        }
      </div>
    )

  }
}


export default Dashboard;