import React, { Component } from 'react';
import {  Route, Redirect, Switch } from 'react-router-dom';
import userAPI from './utils/userAPI'
// components
import Landing from './Pages/Landing/Landing'
import Dashboard from './Pages/Dashboard/Dashboard'

class App extends Component {

  state= {
    loggedIn: false,
    username: "",
    email: "",
    theme: ""
  }

  componentWillMount = () => {
    this.checkLogin();
  }

  checkLogin = () => {
    userAPI.checkLogin().then((user) => {
      if (user.data !== false) {
        userAPI.findUserById(user.data).then((data) => {
          console.log(JSON.stringify(data.data))
          this.setState({
            loggedIn: true,
            username: data.data.username,
            email: data.data.email,
            theme: data.data.theme
          })

        })
      }
    })
  }

  render() {
    return (
      <div className="App" > 
        <div className={this.state.theme === 2 ? "dark-theme" : "light-theme"} id="theme-div">
          <Switch>
            <Route exact path="/" render={() => (
              this.state.loggedIn ? (
                <Dashboard username={this.state.username} email={this.state.email} theme={this.state.theme} />
                ) : (
                  <Landing />
                  )
                  )} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
