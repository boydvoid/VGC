import React, { Component } from 'react';
import userAPI from '../../utils/userAPI';

import gamesAPI from '../../utils/gamesAPI';
import SidePanel from '../../Components/SidePanel/SidePanel';
import Searchbar from '../../Components/Searchbar/Searchbar';
import './Dashboard.css';
import RightPanel from '../../Components/RightPanel/RightPanel';

class Dashboard extends Component {

  state = {

    theme: this.props.theme,
    searchGames: ""
  }

	componentDidMount = () => {
    this.switchState();
  };

	getGame = () => {

		gameAPI.gameID("19560").then((data) => {

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
    if (this.props.theme === 1) {
      document.getElementById("switch").checked = false;
    } else if (this.props.theme === 2) {
      document.getElementById("switch").checked = true;
    } 
  }


  toggleTheme = () => {
    if (this.state.theme === 1) {
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
      })
      document.getElementById("theme-div").classList.remove("dark-theme")
      document.getElementById("theme-div").classList.add("light-theme")
    }
  }

  openRightPanel = () => {
    document.getElementById("mySidenav").style.width = "900px";
  }

  closeRightPanel = () => {
    document.getElementById("mySidenav").style.width = "0";
  }

  //temporary get popular search replace with game search
  gameSearch = (event) => {
    event.preventDefault();

    gamesAPI.getPopular().then(data => {
      this.setState({
        searchedGames: data
      })
    })
  }

  render() {
    return (
      <div>
        {/* right panel */}
        <RightPanel closeRightPanel={this.closeRightPanel} searchedGames={this.state.searchedGames}/>
        {/* nav panel */}
        <SidePanel username={this.props.username} buttonClick={this.logout} buttonText={"Logout"} profileImg={this.props.profileImg} active={this.props.active} />

        <div className="content container-fluid">
          <Searchbar themeChecked={this.props.themeChecked} toggleTheme={this.toggleTheme} openRightPanel={this.openRightPanel} closeRightPanel={this.closeRightPanel}/>
          {this.props.children}
        </div>

      </div>

    )

  }
}


export default Dashboard;