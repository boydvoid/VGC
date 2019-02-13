import React, { Component } from 'react'
import userAPI from '../../utils/userAPI';
import gameAPI from '../../utils/gamesAPI';
import ThemeSelect from '../ThemeSelect/ThemeSelect'
import SidePanel from '../../Components/SidePanel/SidePanel';
import Searchbar from '../../Components/Searchbar/Searchbar'
import './Dashboard.css'

class Dashboard extends Component {

  state = {
    theme: this.props.theme
  };

  componentWillMount() {

	this.getGame()

  }

	componentDidMount = () => {
    this.switchState();
  };

	getGame = () => {

		gameAPI.gameAgeRating("23748").then((data) => {

				console.log(data);

			})

	};

  logout = () => {
    userAPI.logout().then(()=> {
      //reload the window on sucessful logout
      window.location.reload();
    });
  };

  //check the state of the theme toggle on the dashboard
  switchState = () => {
    if(this.props.theme  === 1){
      document.getElementById("switch").checked = false;
    } else if(this.props.theme === 2){
      document.getElementById("switch").checked = true;
      
    } else {
      
    }
  };

  toggleTheme = () => {
    if(this.state.theme === 1){
      let data = {
        theme: 2
      };
      userAPI.update(data).then(() => {
        this.setState({
          theme: 2
        });

        document.getElementById("theme-div").classList.remove("light-theme");
        document.getElementById("theme-div").classList.add("dark-theme")
      })
    } else {

      let data = {
        theme: 1
      };
      userAPI.update(data).then(() => {
        this.setState({
          theme: 1
        })
      });
        document.getElementById("theme-div").classList.remove("dark-theme");
        document.getElementById("theme-div").classList.add("light-theme")
    }
  };

  render() {
    return (
      <div>
        {this.state.theme === 0 
        ?
          <ThemeSelect /> 
        : 

        <div>
          <SidePanel username={this.props.username} buttonClick={this.logout} buttonText={"Logout"} profileImg={this.props.profileImg} active={this.props.active} />
          
          <div className="content">
          <Searchbar themeChecked={this.props.themeChecked} toggleTheme={this.toggleTheme}/>
          {this.props.children}
          </div>
          
        </div>

        }
      </div>
    )

  }
}


export default Dashboard;