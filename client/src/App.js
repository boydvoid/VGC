import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// components
import Landing from './Pages/Landing/Landing'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path="/" component={Landing} />
        </Router>
      </div>
    );
  }
}

export default App;
