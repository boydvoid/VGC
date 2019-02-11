import React, { Component } from 'react';
import {  Route, Redirect, Switch } from 'react-router-dom';
import LoginAPI from './utils/loginAPI'
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
    LoginAPI.checkLogin().then((user) => {
      if (user.data !== false) {
        LoginAPI.findUserById(user.data).then((data) => {
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
      <div className="App">
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
    );
  }
}

export default App;
