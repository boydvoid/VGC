import React, { Component } from "react";
import "./RightPanel.css";
import { resolve } from "url";
import Button from "../../Components/Button/Button";
import PublicSell from "../../Components/PublicSell/PublicSell";
import gamesAPI from "../../utils/gamesAPI";
import publicSellAPI from "../../utils/publicSellAPI";
import userAPI from "../../utils/userAPI";
import chatAPI from "../../utils/chatAPI";

import Chat from "../../Components/Chat/Chat";

const fuzzysort = require("fuzzysort");

class RightPanel extends Component {
  state = {
    username: this.props.username,
    sInputGames: "",
    sInputSell: "",
    sInputChat: "",
    sResultsGames: [],
    sToggleSell: false,
    sResultsSell: [],
    sResultsFiltered: [],
    sToggleActiveSearch: "games",
    socket: this.props.socket,
    chatMessages: [],
    sUsersChatsIds: this.props.chatIds,
    sUsersChats: [],
    sUserSpeakingWith: "",
    chatNotification: false,
    chatboxExpanded: false,
    chatListDisplay: true
  };

  componentWillMount = () => {
    this.socketFunction();
  };

  componentDidMount = () => {
    this.loadUsersChats();
  };

  socketFunction = () => {
    const { socket } = this.state;

    socket.on("chat started", data => {
      const { username } = this.state;

      publicSellAPI.findGame(data.data.id).then(done => {
        // find the user who posted the game for sale
        userAPI.findUserById(done.data.userID).then(postedUser => {
          const chatInfo = {
            gameId: data.data.id,
            user1: data.username,
            user2: postedUser.data.username,
            gameName: done.data.name
          };

          if (username === postedUser.data.username) {
            const tempArray = [];
            const initialMsg = {
              sender: data.username,
              receiver: postedUser.data.username,
              message: `Hello ${
                postedUser.data.username
              }, I am interested in your copy of ${done.data.name}.`
            };

            tempArray.push(initialMsg);

            this.setState({
              chatMessages: tempArray
            });
            // create notification
            // create chat id in posted users db
            // make chat bar red
            this.chatNotify();
          }
          // the inquiring user
          if (username === data.username) {
            this.createChatId(chatInfo);

            const tempArray = [];

            const initialMsg = {
              sender: data.username,
              receiver: postedUser.data.username,
              message: `Hello ${
                postedUser.data.username
              }, I am interested in your copy of ${done.data.name}.`
            };

            tempArray.push(initialMsg);
            this.setState({
              chatMessages: tempArray
            });
            // create div on screen, function in dashboard
            // create chat id in db
            // create chat in db
          }
        });
      });
    });

    socket.on("chat message", async msg => {
      const { username, sUserSpeakingWith } = this.state;
      await this.addToChat(msg);
      console.log("run2");
      // add to chat
      if (msg.sender === username || msg.receiver === username) {
        let tempArray = [];
        console.log("run3");
        chatAPI.getChat(msg.chatId).then(chat => {
          tempArray = chat.data.messages;
          this.setState({
            chatMessages: tempArray
          });
        });
      }
    });
  };

  addToChat = msg => {
    const { username } = this.state;
    console.log("run");
    const promise = new Promise((resolve, reject) => {
      if (msg.sender === username) {
        resolve(chatAPI.add(msg));
      } else {
        resolve();
      }
    });
    return promise;
  };

  createChatId = chatInfo => {
    chatAPI.create(chatInfo).then(created => {
      // save chat id in user db
      const x = {
        chatId: created.data._id,
        username: chatInfo.user1
      };
      userAPI.addChat(x).then(done => {});

      const y = {
        chatId: created.data._id,
        username: chatInfo.user2
      };
      userAPI.addChat(y).then(done => {});
    });
  };

  handleChange = event => {
    const { sResultsSell } = this.state;
    const { name } = event.target;
    this.setState({
      [name]: event.target.value
    });

    if (event.target.name === "sResultsFiltered") {
      if (event.target.value === "") {
        this.setState({
          sResultsFiltered: sResultsSell
        });
      } else {
        this.fuzzysearch();
      }
    }
  };

  fuzzysearch = () => {
    const { sInputSell, sResultsSell } = this.state;
    const search = fuzzysort.go(sInputSell, sResultsSell, { keys: ["name"] });
    const convertToArray = [];

    search.forEach(game => {
      convertToArray.push(game.obj);
    });
    if (sInputSell.length === "") {
      this.setState({
        sResultsFiltered: sResultsSell
      });
    } else {
      this.setState({
        sResultsFiltered: convertToArray
      });
    }
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

  // notification
  chatNotify = () => {
    this.setState({
      chatNotification: true
    });
  };

  loadUsersChats = () => {
    const { sUsersChatsIds } = this.state;
    if (sUsersChatsIds !== undefined) {
      const tempArray = [];
      sUsersChatsIds.forEach(chat => {
        chatAPI.getChat(chat).then(fullChat => {
          tempArray.push(fullChat.data);
          this.setState({
            sUsersChats: tempArray
          });
        });
      });
    }
  };

  toggleChatDisplay = event => {
    const { chatListDisplay } = this.state;
    const chatId = event.target.attributes.getNamedItem("data-chatid").value;
    if (chatListDisplay === true) {
      // get the chats messages
      const tempArray = [];
      chatAPI.getChat(chatId).then(chat => {
        chat.data.messages.forEach(message => {
          const { username } = this.state;
          message.chatId = chatId;
          tempArray.push(message);
          if (chat.data.user1 !== username) {
            this.setState({
              chatListDisplay: false,
              sUserSpeakingWith: chat.data.user1,
              chatMessages: tempArray
            });
          } else {
            this.setState({
              chatListDisplay: false,
              sUserSpeakingWith: chat.data.user2,
              chatMessages: tempArray
            });
          }
        });
      });
    } else {
      this.setState({
        sUserSpeakingWith: "",
        chatListDisplay: true
      });
    }
  };

  // receive msg
  sendMsg = event => {
    event.preventDefault();
    const { socket, sInputChat } = this.state;

    const chatId = document
      .getElementById("sendChatBtn")
      .attributes.getNamedItem("chatid").value;
    const sender = document
      .getElementById("sendChatBtn")
      .attributes.getNamedItem("username").value;
    const receiver = document
      .getElementById("sendChatBtn")
      .attributes.getNamedItem("userspeakingwith").value;

    const msgData = {
      message: sInputChat,
      chatId,
      sender,
      receiver
    };
    socket.emit("chat message", msgData);
  };

  gameSearch = event => {
    event.preventDefault();
    const { sInputGames } = this.state;
    const query = sInputGames;

    gamesAPI.gameSearch(query).then(data => {
      const tempArray = [];
      data.data.forEach(game => {
        let gameSeries;
        const gameModes = [];
        const gameCompanies = [];
        const gamePlatforms = [];
        const gameReleaseDate = [];
        const gameScreenshots = [];
        const gameWebsites = [];

        if (game.cover !== undefined && game.cover.url !== undefined) {
          // Replace image size.

          const cover = game.cover.url.replace("t_thumb", "t_1080p");

          // Check if Game is part of a series.
          game.collection === undefined || game.collection.name === undefined
            ? (gameSeries = "No Series")
            : (gameSeries = game.collection.name);

          // Check if Game has Game Modes listed.
          if (game.game_modes === undefined) {
            gameModes.push("Not Available");
          } else {
            for (let j = 0; j < game.game_modes.length; j++) {
              gameModes.push(game.game_modes[j].name);
            }
          }

          // Check if Game has Companies listed.
          if (game.involved_companies === undefined) {
            gameCompanies.push("Not Available");
          } else {
            for (let j = 0; j < game.involved_companies.length; j++) {
              gameCompanies.push(game.involved_companies[j].company.name);
            }
          }

          // Check if Game has platforms listed.
          if (game.platforms === undefined) {
            gamePlatforms.push("Not Available");
          } else {
            for (let j = 0; j < game.platforms.length; j++) {
              gamePlatforms.push(game.platforms[j].name);
            }
          }

          // Check if Game has Release Date listed.
          if (game.release_dates === undefined) {
            gameReleaseDate.push("Not Available");
          } else {
            for (let j = 0; j < game.release_dates.length; j++) {
              gameReleaseDate.push(game.release_dates[j].human);
            }
          }

          // Check if Game has screenshots listed.
          if (game.screenshots === undefined) {
            gameScreenshots.push("Not Available");
          } else {
            for (let j = 0; j < game.screenshots.length; j++) {
              gameScreenshots.push(game.screenshots[j].url);
            }
          }

          // Check if Game has websites listed.
          if (game.websites === undefined) {
            gameWebsites.push("Not Available");
          } else {
            for (let j = 0; j < game.websites.length; j++) {
              gameWebsites.push(game.websites[j].url);
            }
          }

          tempArray.push({
            id: game.id,
            name: game.name,
            series: gameSeries,
            imgUrl: cover,
            gameModes,
            company: gameCompanies,
            platform: gamePlatforms,
            releaseDate: gameReleaseDate,
            averageRating: game.aggregated_rating,
            averageRatingSources: game.aggregated_rating_count,
            screenshots: gameScreenshots,
            summary: game.summary,
            igdbLink: game.url,
            websites: gameWebsites
          });

          this.setState({
            sResultsGames: tempArray
          });
        }
      });
    });
  };

  togglePublicSell = () => {
    const { sToggleSell } = this.state;
    if (sToggleSell === false) {
      this.getGamesForSale();
      this.setState({
        sToggleActiveSearch: "sell"
      });
    } else {
      this.setState({
        sToggleSell: false,
        sToggleActiveSearch: "games"
      });
    }
  };

  getGamesForSale = () => {
    publicSellAPI.getGames().then(data => {
      this.setState({
        sResultsSell: data.data,
        sResultsFiltered: data.data,
        sToggleSell: true
      });
    });
  };

  startChat = event => {
    const id = event.target.attributes.getNamedItem("data-id").value;
    const { socket, username } = this.state;

    const data = {
      id,
      initialUser: username
    };
    socket.emit("chat started", data);
  };

  render() {
    // deconstructing props and state
    const { closeRightPanel, addToCollection } = this.props;
    const {
      sToggleSell,
      sToggleActiveSearch,
      sResultsGames,
      sResultsFiltered
    } = this.state;

    return (
      <div id="mySidenav" className="sidenav">
        {/* chat */}

        <Chat
          handleChange={this.handleChange}
          titleClick={this.expandChatBox}
          chatExpanded={this.state.chatboxExpanded}
          sendMsg={this.sendMsg}
          titleColor={this.state.chatNotification ? "red" : ""}
          chatMessages={this.state.chatMessages}
          chatListDisplay={this.state.chatListDisplay}
          usersChats={this.state.sUsersChats}
          username={this.props.username}
          toggleChatDisplay={this.toggleChatDisplay}
          userSpeakingWith={this.state.sUserSpeakingWith}
        />
        <div className="d-flex right-panel-nav justify-content-between align-items-center">
          <Button text="&times;" onclick={closeRightPanel} class="closebtn" />
          <div>
            <Button
              class={
                sToggleActiveSearch === "games"
                  ? "searchToggle toggleActive border-radius-left"
                  : "searchToggle border-radius-left"
              }
              text="Search for Games"
              onclick={sToggleSell ? this.togglePublicSell : ""}
            />
            <Button
              class={
                sToggleActiveSearch === "sell"
                  ? "searchToggle toggleActive border-radius-right"
                  : "searchToggle border-radius-right"
              }
              text="Games for Sale"
              onclick={sToggleSell ? "" : this.togglePublicSell}
            />
          </div>
          <form className="searchForm">
            <input
              className="searchInput"
              id="gameSearch"
              type="text"
              placeholder="Search"
              name={sToggleSell ? "sInputSell" : "sInputGames"}
              onChange={this.handleChange}
            />
            {sToggleSell ? (
              <Button
                class="search-btn"
                text={<i className="fas fa-search" />}
              />
            ) : (
              <Button
                class="search-btn"
                type="submit"
                text={<i className="fas fa-search" />}
                onclick={sToggleSell ? "" : this.gameSearch}
              />
            )}
          </form>
        </div>
        {sToggleSell ? (
          // show games for sale
          <PublicSell
            filteredResults={sResultsFiltered}
            getGamesForSale={this.getGamesForSale}
            handleChange={this.handleChange}
            startChat={this.startChat}
          />
        ) : (
          // show search list
          <div className="searchResults">
            {sResultsGames.map(game => {
              return (
                <div key={game.index}>
                  <img
                    className="search-img"
                    src={game.imgUrl}
                    alt={game.name}
                  />
                  <p>{game.name}</p>
                  <Button
                    text="Add to Collection"
                    dataId={game.id}
                    dataName={game.name}
                    dataUrl={game.imgUrl}
                    onclick={addToCollection}
                  />
                  <Button
                    text="Add to Wishlist"
                    dataId={game.id}
                    dataName={game.name}
                    dataUrl={game.imgUrl}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
export default RightPanel;
