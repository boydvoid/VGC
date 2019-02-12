import React, { Component } from 'react'
import userAPI from '../../utils/userAPI';
import Button from '../../Components/Button/Button';
import ThemeSelect from '../ThemeSelect/ThemeSelect'
import SidePanel from '../../Components/SidePanel/SidePanel';
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
          <SidePanel username={this.props.username} buttonClick={this.logout} buttonText="Logout" profileImg={this.props.profileImg}/>
          <p>{this.props.username}</p>
          <p>{this.props.email}</p>
          <p>{this.props.theme}</p>
        </div>

        }
      </div>
    )

  }
}


export default Dashboard;