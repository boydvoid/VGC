import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import socketIO from "socket.io-client";
import userAPI from "./utils/userAPI";
// components
import Landing from "./Pages/Landing/Landing";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Profile from "./Components/Profile/Profile";
import Collection from "./Pages/Collection/Collection";
import Wishlist from "./Pages/Wishlist/Wishlist";
import Sell from "./Pages/Sell/Sell";
import collectionAPI from "./utils/collectionAPI";
import sellAPI from "./utils/sellAPI";
import wishlistAPI from "./utils/wishlistAPI";
// socket io

class App extends Component {
  state = {
    userId: "",
    loggedIn: false,
    username: "",
    email: "",
    theme: "",
    img: "",
    collectionLength: 0,
    popularSystem: 0,
    value: 0,
    wishlistLength: 0,
    sellingLength: 0,
    last5Collection: [],
    last5Wishlist: [],
    last5Selllist: [],
    chatIds: [],
    loaded: false,
    socket: socketIO()
  };

  componentWillMount = async () => {
    this.checkLogin();
    this.socketFunctions();
  };

  socketFunctions = () => {
    const { socket } = this.state;
    socket.on("added to collection", data => {
      const { username } = this.state;
      if (data.username === username) {
        this.getCollectionLength();
      }
    });

    socket.on("removed from collection", data => {
      const { username } = this.state;
      if (data.username === username) {
        this.getCollectionLength();
      }
    });
    socket.on("added to wishlist", data => {
      const { username } = this.state;
      if (data.username === username) {
        this.getWIshlistLength();
      }
    });

    socket.on("removed from wishlist", data => {
      const { username } = this.state;
      if (data.username === username) {
        this.getWIshlistLength();
      }
    });
    socket.on("added to sell", data => {
      const { username } = this.state;
      if (data.username === username) {
        console.log("run added to sell");
        this.getSellLength();
      }
    });
    socket.on("removed from sell", data => {
      const { username } = this.state;
      if (data.username === username) {
        this.getSellLength();
      }
    });
  };

  checkLogin = () => {
    userAPI.checkLogin().then(user => {
      if (user.data !== false) {
        userAPI.findUserById(user.data).then(data => {
          // connect socket

          this.setState({
            userId: data.data._id,
            loggedIn: true,
            username: data.data.username,
            email: data.data.email,
            theme: data.data.theme,
            img: data.data.img,
            loaded: true,
            chatIds: data.data.chats
          });

          this.getCollectionLength();
        });
      } else {
        this.setState({
          loggedIn: false,
          loaded: true
        });
      }
    });
  };

  // get collection length
  getCollectionLength = () => {
    console.log("run get collection");
    // get games for specific user
    collectionAPI.getGames().then(games => {
      console.log("run get collection");
      this.getWIshlistLength();
      this.setState({
        collectionLength: games.data.length,
        last5Collection: games.data.slice(-5)
      });
    });
  };

  // get wishlist length and latest games added
  getWIshlistLength = () => {
    // get games for specific user
    wishlistAPI.getGames().then(games => {
      this.getSellLength();

      console.log(games);
      this.setState({
        wishlistLength: games.data.length,
        last5Wishlist: games.data.slice(-5)
      });
    });
  };

  // get selling length
  getSellLength = () => {
    // get games for specific user
    sellAPI.getSell().then(games => {
      console.log(games);
      this.setState({
        sellingLength: games.data.length,
        last5Selllist: games.data.slice(-5)
      });
    });
  };

  componentWillUnmount = () => {
    const { socket } = this.state;
    socket.close();
  };

  render() {
    const {
      collectionLength,
      sellingLength,
      wishlistLength,
      last5Wishlist,
      last5Selllist,
      last5Collection
    } = this.state;
    return (
      <div className="App">
        {this.state.loaded ? (
          <div
            className={this.state.theme === 2 ? "dark-theme" : "light-theme"}
            id="theme-div"
          >
            <Switch>
              <Route
                exact
                path="/"
                render={() =>
                  this.state.loggedIn === true ? (
                    <Redirect to="/profile" />
                  ) : (
                    <Landing />
                  )
                }
              />
              <Route
                exact
                path="/profile"
                render={() =>
                  this.state.loggedIn ? (
                    <Dashboard
                      socket={this.state.socket}
                      theme={this.state.theme}
                      username={this.state.username}
                      email={this.state.email}
                      profileImg={this.state.img}
                      active="profile"
                      chatIds={this.state.chatIds}
                    >
                      <Profile
                        username={this.state.username}
                        collectionLength={collectionLength}
                        sellingLength={sellingLength}
                        wishlistLength={wishlistLength}
                        last5Collection={last5Collection}
                        last5Wishlist={last5Wishlist}
                        last5Selllist={last5Selllist}
                      />
                    </Dashboard>
                  ) : (
                    <Redirect to="/" />
                  )
                }
              />
              <Route
                exact
                path="/collection"
                render={() =>
                  this.state.loggedIn ? (
                    <Dashboard
                      socket={this.state.socket}
                      theme={this.state.theme}
                      username={this.state.username}
                      email={this.state.email}
                      profileImg={this.state.img}
                      active="collection"
                      chatIds={this.state.chatIds}
                    >
                      <Collection
                        socket={this.state.socket}
                        username={this.state.username}
                      />
                    </Dashboard>
                  ) : (
                    <Redirect to="/" />
                  )
                }
              />
              <Route
                exact
                path="/wishlist"
                render={() =>
                  this.state.loggedIn ? (
                    <Dashboard
                      socket={this.state.socket}
                      theme={this.state.theme}
                      username={this.state.username}
                      email={this.state.email}
                      profileImg={this.state.img}
                      active="wishlist"
                      chatIds={this.state.chatIds}
                    >
                      <Wishlist
                        username={this.state.username}
                        socket={this.state.socket}
                      />
                    </Dashboard>
                  ) : (
                    <Redirect to="/" />
                  )
                }
              />
              <Route
                exact
                path="/sell"
                render={() =>
                  this.state.loggedIn ? (
                    <Dashboard
                      socket={this.state.socket}
                      theme={this.state.theme}
                      username={this.state.username}
                      email={this.state.email}
                      profileImg={this.state.img}
                      active="sell"
                      chatIds={this.state.chatIds}
                    >
                      <Sell
                        socket={this.state.socket}
                        username={this.state.username}
                      />
                    </Dashboard>
                  ) : (
                    <Redirect to="/" />
                  )
                }
              />
            </Switch>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default App;
