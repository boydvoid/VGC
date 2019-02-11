import React, { Component } from 'react';
import './App.css';
import {  Route, Redirect, Switch } from 'react-router-dom';
import LoginAPI from './utils/loginAPI'
// components
import Landing from './Pages/Landing/Landing'
import Dashboard from './Pages/Dashboard/Dashboard'

class App extends Component {

  state= {
    loggedIn: false
  }

  componentWillMount = () => {
    this.checkLogin();
  }

  checkLogin = () => {
    LoginAPI.checkLogin().then((user) => {
      console.log(user)
      if (user.data !== false) {
        this.setState({
          loggedIn: true
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
                <Dashboard />
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
