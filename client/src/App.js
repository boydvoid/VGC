import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
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
        <BrowserRouter>
          <Switch>
          <Route exact path="/dashboard" render={() => (
                    this.state.loggedIn === false ? (
                      <Redirect to="/" />
                    ) : (
                        <Dashboard />
                      )
                  )} />
            <Route exact path="/" render={() => (
              this.state.loggedIn ? (
                <Redirect to="/dashboard" />
                ) : (
                  <Landing />
                  )
                  )} />
          
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
