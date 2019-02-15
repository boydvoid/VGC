import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import userAPI from './utils/userAPI'
// components
import Landing from './Pages/Landing/Landing'
import Dashboard from './Pages/Dashboard/Dashboard'
import Profile from './Components/Profile/Profile'
import Collection from './Pages/Collection/Collection'
import Wishlist from './Components/Wishlist/Wishlist'
import Sell from './Components/Sell/Sell'
//socket io
import socketIO from 'socket.io-client'
class App extends Component {

  state = {
    loggedIn: false,
    username: "",
    email: "",
    theme: "",
    img: "",
    loaded: false,
    socket: socketIO()
  }

  componentWillMount = async () => {
    await this.initSocket();
    this.checkLogin();
  }

  initSocket = () => {
    const { socket } = this.state;

    let promise = new Promise((resolve, reject) => {
      resolve(socket.on('connected'))
    })

    return promise;
    // promise.then(() => {
    //   this.checkLogin()
    // })
  }

  checkLogin = () => {
    userAPI.checkLogin().then((user) => {
      if (user.data !== false) {
        userAPI.findUserById(user.data).then((data) => {

          //connect socket 
          const { socket } = this.state;
          socket.emit("USER_CONNECTED", data.data.username)

          this.setState({
            loggedIn: true,
            username: data.data.username,
            email: data.data.email,
            theme: data.data.theme,
            img: data.data.img,
            loaded: true,
          })
        })
      } else {
        this.setState({
          loggedIn: false,
          loaded: true
        })
      }
    })
  }

  
  render() {
    return (

      <div className="App" >

        {this.state.loaded ?
          <div className={this.state.theme === 2 ? "dark-theme" : "light-theme"} id="theme-div">
            <Switch>
              <Route exact path="/" render={() => (
                this.state.loggedIn === true ? (
                  <Redirect to='/profile' />
                ) : (
                    <Landing />
                  )
              )} />
              <Route exact path="/profile" render={() => (
                this.state.loggedIn ? (
                  <Dashboard socket={this.state.socket} theme={this.state.theme} username={this.state.username} email={this.state.email} profileImg={this.state.img} active="profile" > <Profile /></Dashboard >
                ) : (
                    <Redirect to='/' />
                  )
              )} />
              <Route exact path="/collection" render={() => (
                this.state.loggedIn ? (
                  <Dashboard socket={this.state.socket} theme={this.state.theme} username={this.state.username} email={this.state.email} profileImg={this.state.img} active="collection"> <Collection socket={this.state.socket}/></Dashboard >
                ) : (
                    <Redirect to='/' />
                  )
              )} />
              <Route exact path="/wishlist" render={() => (
                this.state.loggedIn ? (
                  <Dashboard socket={this.state.socket} theme={this.state.theme} username={this.state.username} email={this.state.email} profileImg={this.state.img} active="wishlist"> <Wishlist /></Dashboard >
                ) : (
                    <Redirect to='/' />
                  )
              )} />
              <Route exact path="/sell" render={() => (
                this.state.loggedIn ? (
                  <Dashboard socket={this.state.socket} theme={this.state.theme} username={this.state.username} email={this.state.email} profileImg={this.state.img} active="sell"> <Sell /></Dashboard >
                ) : (
                    <Redirect to='/' />
                  )
              )} />
            </Switch>
          </div>

          : <div></div>}

      </div>
    );
  }
}

export default App;
