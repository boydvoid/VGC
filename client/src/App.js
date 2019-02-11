import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import LoginAPI from './utils/loginAPI'
// components
import Landing from './Pages/Landing/Landing'
import Dashboard from './Pages/Dashboard/Dashboard'

let loggedIn = "";
class App extends Component {

  componentWillMount = () => {
    this.checkLogin();
  }

  checkLogin = () => {
    LoginAPI.checkLogin().then((user) => {
      if (user !== false) {
        loggedIn = true
      }
    })
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/" render={() => (
              loggedIn ? (
                <Redirect to="/dashboard" />
              ) : (
                  <Landing />
                )
            )} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
