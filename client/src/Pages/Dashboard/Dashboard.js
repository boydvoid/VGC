import React, { Component } from "react";
import userAPI from "../../utils/userAPI";
import SidePanel from "../../Components/SidePanel/SidePanel";
import Searchbar from "../../Components/Searchbar/Searchbar";
import "./Dashboard.css";
import RightPanel from "../RightPanel/RightPanel";
import Chat from "../../Components/Chat/Chat";
import collectionAPI from "../../utils/collectionAPI";

class Dashboard extends Component {
  state = {
    theme: this.props.theme,
    rightPanelOpen: false,
    chatboxExpanded: false,
    publicSellGames: [],
    overlayShow: "",
    socket: this.props.socket
  };

  componentDidMount = () => {
    this.switchState();
  };

  logout = () => {
    userAPI.logout().then(() => {
      // reload the window on sucessful logout
      window.location.reload();
    });
  };

  // check the state of the theme toggle on the dashboard
  switchState = () => {
    if (this.props.theme === 1) {
      document.getElementById("switch").checked = false;
    } else if (this.props.theme === 2) {
      document.getElementById("switch").checked = true;
    }
  };

  toggleTheme = () => {
    if (this.state.theme === 1) {
      const data = {
        theme: 2
      };
      userAPI.update(data).then(() => {
        this.setState({
          theme: 2
        });

        document.getElementById("theme-div").classList.remove("light-theme");
        document.getElementById("theme-div").classList.add("dark-theme");
      });
    } else {
      const data = {
        theme: 1
      };
      userAPI.update(data).then(() => {
        this.setState({
          theme: 1
        });
      });
      document.getElementById("theme-div").classList.remove("dark-theme");
      document.getElementById("theme-div").classList.add("light-theme");
    }
  };

  openRightPanel = () => {
    document.getElementById("mySidenav").style.right = "0px";
    this.setState({
      rightPanelOpen: true,
      overlayShow: "overlay-show"
    });
  };

  closeRightPanel = () => {
    document.getElementById("mySidenav").style.right = "-900px";
    this.setState({
      rightPanelOpen: false,
      overlayShow: ""
    });
  };

  expandChatBox = () => {
    if (this.state.chatboxExpanded === false) {
      this.setState({
        chatboxExpanded: true
      });
    } else {
      this.setState({
        chatboxExpanded: false
      });
    }
  };

  // receive msg
  sendMsg = event => {
    event.preventDefault();
    const { socket } = this.state;
    // change to state later
    const msg = document.getElementById("chatInput");

    socket.emit("chat message", msg.value);
    msg.value = "";

    socket.on("chat message", msg => {
      const msgP = (document.createElement("p").text = msg);
      document.getElementById("msgs").append(msgP);
    });
  };

  addToCollection = event => {
    const id = event.target.attributes.getNamedItem("data-id").value;
    const name = event.target.attributes.getNamedItem("data-name").value;
    const url = event.target.attributes.getNamedItem("data-url").value;
    const data = {
      id,
      name,
      url,
      index: ""
    };
    collectionAPI.add(data).then(done => {
      // live update with reloading page
      const { socket } = this.state;
      socket.emit("added to collection", done);
    });
  };

  addToWishlist = () => {};

  render() {
    return (
      <div>
        <div
          className={`overlay ${this.state.overlayShow}`}
          onClick={this.closeRightPanel}
        />
        {/* chat */}
        <Chat
          titleClick={this.expandChatBox}
          chatExpanded={this.state.chatboxExpanded}
          sendMsg={this.sendMsg}
        />
        {/* right panel */}
        <RightPanel
          closeRightPanel={this.closeRightPanel}
          searchedGames={this.state.searchedGames}
          addToCollection={this.addToCollection}
          socket={this.props.socket}
        />
        {/* nav panel */}
        <SidePanel
          username={this.props.username}
          buttonClick={this.logout}
          buttonText="Logout"
          profileImg={this.props.profileImg}
          active={this.props.active}
        />

        <div className="content container-fluid">
          <Searchbar
            themeChecked={this.props.themeChecked}
            toggleTheme={this.toggleTheme}
            openRightPanel={this.openRightPanel}
            closeRightPanel={this.closeRightPanel}
          />
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Dashboard;
