import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import socketIO from "socket.io-client";
import ProtectedRoute from "./Components/Route/Route";
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
import gamesAPI from "./utils/gamesAPI";
import Loading from "./Components/loading/Loading";
import publicSellAPI from "./utils/publicSellAPI";
import chatAPI from "./utils/chatAPI";
// socket io

class App extends Component {
  state = {
    loggedIn: false,
    username: "",
    email: "",
    theme: "",
    img: "",
    collectionLength: 0,
    wishlistLength: 0,
    sellingLength: 0,
    last5Collection: [],
    last5Wishlist: [],
    last5Selllist: [],
    chatIds: [],
    collection: [],
    wishlist: [],
    sSell: [],
    sUserChats: [],
    loaded: false,
    game: {
      data: {
        cover: "",
        avgRating: "",
        avgRatingSources: "",
        companies: [],
        gameID: "",
        gameModes: [],
        genres: [],
        igdbURL: "",
        platform: [],
        releaseDate: [],
        screenshots: [],
        series: [],
        summary: "",
        videos: [{}],
        websites: []
      }
    },
    overlayShow: false,
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
            loggedIn: true,
            username: data.data.username,
            email: data.data.email,
            theme: data.data.theme,
            img: data.data.img,
            chatIds: data.data.chats
          });

          this.getCollectionLength();
        });
        this.getGames();
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
    // get games for specific user
    collectionAPI.getGames().then(games => {
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
      this.setState({
        sellingLength: games.data.length,
        last5Selllist: games.data.slice(-5)
      });
    });
  };

  setLoadedTrue = () => {
    this.setState({
      loaded: true
    });
  };

  // search panel
  openRightPanel = () => {
    document.getElementById("mySidenav").style.right = "0px";
    this.setState({
      overlayShow: "overlay-show"
    });
  };

  // search panel
  closeRightPanel = () => {
    if (document.getElementById("mySidenav").style.right === "0px") {
      document.getElementById("mySidenav").style.right = "-900px";
    }
    if (document.getElementById("gamePanel").style.right === "0px") {
      document.getElementById("gamePanel").style.right = "-900px";
    }
    this.setState({
      overlayShow: ""
    });
  };

  // gamepanel
  closeGamePanel = () => {
    this.setState({
      game: [],
      overlayShow: ""
    });
  };

  getGameInfo = event => {
    const id = event.target.attributes.getNamedItem("gameid").value;
    gamesAPI.gameID(id).then(game => {
      document.getElementById("gamePanel").style.right = "0px";
      this.setState({
        game,
        overlayShow: "overlay-show"
      });
    });
  };

  getGames = () => {
    collectionAPI.getGames().then(data => {
      this.setState({
        collection: data.data
      });

      wishlistAPI.getGames().then(data => {
        if (data !== null) {

<<<<<<< HEAD
        sellAPI.getSell().then(data => {
          this.setLoadedTrue();
          this.loadUsersChats();
=======
>>>>>>> 4efc59ad4dff935292321a390bb8722ce7751ddc
          this.setState({
            wishlist: data.data
          });
        }

        sellAPI.getSell().then(data => {
          this.setLoadedTrue();
          this.loadUsersChats();
          if (data !== null) {

            this.setState({
              sSell: data.data
            });
          }
        });
      });
    });
  };

  loadUsersChats = () => {
    const { socket, chatIds } = this.state;
    if (chatIds !== undefined) {
      const tempArray = [];
      const roomsId = [];
      chatIds.forEach(chat => {
        chatAPI.getChat(chat).then(fullChat => {
          publicSellAPI.findGame(fullChat.data.gameID).then(game => {
            fullChat.data.gameName = game.data.name;
            roomsId.push(fullChat.data._id);
            tempArray.push(fullChat.data);
            this.setState({
              sUserChats: tempArray
            });
            socket.emit("join active", roomsId);
          });
        });
      });
    }
  };

  componentWillUnmount = () => {
    const { socket } = this.state;
    socket.close();
  };

  render() {
    const {
      username,
      email,
      img,
      chatIds,
      game,
      overlayShow,
      sUserChats,
      wishlist,
      sSell,
      collection,
      collectionLength,
      sellingLength,
      wishlistLength,
      last5Wishlist,
      last5Selllist,
      last5Collection,
      loaded,
      theme,
      loggedIn,
      socket
    } = this.state;
    return (
      <div className="App">
        {loaded ? (
          <div
            className={theme === 2 ? "dark-theme" : "light-theme"}
            id="theme-div"
          >
            <Switch>
              <Route
                exact
                path="/"
                render={() =>
                  loggedIn === true ? <Redirect to="/profile" /> : <Landing />
                }
              />
              <ProtectedRoute
                path="/profile"
                loggedIn={loggedIn}
                component={( // eslint-disable-line
                  <Dashboard
                    socket={socket}
                    theme={theme}
                    username={username}
                    email={email}
                    profileImg={img}
                    active="profile"
                    chatIds={chatIds}
                    openRightPanel={this.openRightPanel}
                    closeRightPanel={this.closeRightPanel}
                    overlayShow={overlayShow}
                    game={game}
                    sUserChats={sUserChats}
                  />
                )} // eslint-disable-line
                innerComponent={( // eslint-disable-line
                  <Profile
                    username={username}
                    collectionLength={collectionLength}
                    sellingLength={sellingLength}
                    wishlistLength={wishlistLength}
                    last5Collection={last5Collection}
                    last5Wishlist={last5Wishlist}
                    last5Selllist={last5Selllist}
                    getGameInfo={this.getGameInfo}
                  />
                )} // eslint-disable-line
              />
              {/* <Route
                exact
                path="/profile"
                render={() =>
                  loggedIn ? (
                    <Dashboard>
                      <Profile />
                    </Dashboard>
                  ) : (
                      <Redirect to="/" />
                    )
                }
              /> */}
              <Route
                exact
                path="/collection"
                render={() =>
                  loggedIn ? (
                    <Dashboard
                      socket={socket}
                      theme={theme}
                      username={username}
                      email={email}
                      profileImg={img}
                      active="collection"
                      chatIds={chatIds}
                      openRightPanel={this.openRightPanel}
                      closeRightPanel={this.closeRightPanel}
                      overlayShow={overlayShow}
                      game={game}
                      sUserChats={sUserChats}
                    >
                      <Collection
                        socket={socket}
                        getGameInfo={this.getGameInfo}
                        username={username}
                        collection={collection}
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
                  loggedIn ? (
                    <Dashboard
                      socket={socket}
                      theme={theme}
                      username={username}
                      email={email}
                      profileImg={img}
                      active="collection"
                      chatIds={chatIds}
                      openRightPanel={this.openRightPanel}
                      closeRightPanel={this.closeRightPanel}
                      overlayShow={overlayShow}
                      game={game}
                      sUserChats={sUserChats}
                    >
                      <Wishlist
                        username={username}
                        getGameInfo={this.getGameInfo}
                        socket={socket}
                        wishlist={wishlist}
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
                  loggedIn ? (
                    <Dashboard
                      socket={socket}
                      theme={theme}
                      username={username}
                      email={email}
                      profileImg={img}
                      active="collection"
                      chatIds={chatIds}
                      openRightPanel={this.openRightPanel}
                      closeRightPanel={this.closeRightPanel}
                      overlayShow={overlayShow}
                      game={game}
                      sUserChats={sUserChats}
                    >
                      <Sell
                        socket={socket}
                        getGameInfo={this.getGameInfo}
                        username={username}
                        sSell={sSell}
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
            <Loading />
          )}
      </div>
    );
  }
}

export default App;
