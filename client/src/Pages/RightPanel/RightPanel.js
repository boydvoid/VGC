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
    sChatId: "",
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

    socket.on("chat started", async data => {
      console.log(data);
      const { username } = this.state;
      const game = await this.findGameById(data.data.id);
      const postedUser = await this.findUser(game.data.userID);
      const chatInfo = {
        gameId: game.data._id,
        user1: data.username,
        user2: postedUser.data.username,
        gameName: game.data.name
      };

      if (username === data.username) {
        this.runChatSetupUser1(data, chatInfo);
      }
    });

    socket.on("user 1 chat setup", data => {
      this.runChatSetupUser2(data);
    });

    socket.on("getting message", async msg => {
      console.log(msg);

      let tempArray = [];
      console.log("run3");
      chatAPI.getChat(msg.chatId).then(chat => {
        tempArray = chat.data.messages;
        this.setState({
          chatMessages: tempArray
        });
      });
    });
  };

  joinActiveRooms = () => {};

  findUser = gameId => {
    console.log("find user");
    console.log(gameId);
    const promise = new Promise((resolve, reject) => {
      resolve(userAPI.findUserById(gameId));
    });
    return promise;
  };

  findGameById = chatId => {
    console.log("find game");
    const promise = new Promise((resolve, reject) => {
      resolve(publicSellAPI.findGame(chatId));
    });
    return promise;
  };

  createChatId = chatInfo => {
    const promise = new Promise((resolve, reject) => {
      resolve(chatAPI.create(chatInfo));
    });
    return promise;
  };

  addChatToUser1 = (chat, chatInfo) => {
    const promise = new Promise((resolve, reject) => {
      const x = {
        chatId: chat.data._id,
        username: chatInfo.user1
      };

      resolve(userAPI.addChat(x));
    });
    return promise;
  };

  addChatToUser2 = (chat, chatInfo) => {
    const promise = new Promise((resolve, reject) => {
      const x = {
        chatId: chat.data._id,
        username: chatInfo.user2
      };

      resolve(userAPI.addChat(x));
    });
    return promise;
  };

  getChatUser2 = username => {
    const promise = new Promise((resolve, reject) => {
      resolve(chatAPI.getChatByUser2(username));
    });
    return promise;
  };

  runChatSetupUser1 = async (data, chatInfo) => {
    const { socket, sUsersChats, username } = this.state;

    // await create chat
    const chat = await this.createChatId(chatInfo);
    const addUser1 = await this.addChatToUser1(chat, chatInfo);
    const addUser2 = await this.addChatToUser2(chat, chatInfo);
    const x = sUsersChats;
    x.push(chat.data);

    this.setState({
      sUsersChats: x
    });
    this.chatNotify();
    socket.emit("user 1 chat setup", x);
  };

  runChatSetupUser2 = async data => {
    const { username } = this.state;
    console.log(data[0].user2);
    if (username === data[0].user2) {
      const { sUsersChats } = this.state;
      const x = sUsersChats;
      x.push(data[0]);
      console.log(x);

      this.setState({
        sUsersChats: x
      });

      this.chatNotify();
    }
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
    const { socket, sUsersChatsIds } = this.state;

    if (sUsersChatsIds !== undefined) {
      const tempArray = [];
      const roomsId = [];
      sUsersChatsIds.forEach(chat => {
        chatAPI.getChat(chat).then(fullChat => {
          roomsId.push(fullChat.data._id);
          tempArray.push(fullChat.data);
          this.setState({
            sUsersChats: tempArray
          });
          socket.emit("join active", roomsId);
        });
      });
    }
  };

  toggleChatDisplay = event => {
    const { chatListDisplay } = this.state;
    if (chatListDisplay === true) {
      const chatId = event.target.attributes.getNamedItem("data-chatid").value;
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
              sChatId: message.chatId,
              chatMessages: tempArray
            });
          } else if (chat.data.user2 !== username) {
            this.setState({
              chatListDisplay: false,
              sUserSpeakingWith: chat.data.user2,
              sChatId: message.chatId,
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
    const { socket, sInputChat, sChatId, chatMessages } = this.state;
    const chatId = sChatId;
    const sender = document
      .getElementById("sendChatBtn")
      .attributes.getNamedItem("username").value;
    const receiver = document
      .getElementById("sendChatBtn")
      .attributes.getNamedItem("userspeakingwith").value;
    let msgData = {};
    if (sInputChat === "") {
      msgData = {
        message: "",
        chatId,
        sender,
        receiver
      };
    } else {
      msgData = {
        message: sInputChat,
        chatId,
        sender,
        receiver
      };
    }

    const tempArray = chatMessages;

    tempArray.push(msgData);

    this.setState({
      chatMessages: tempArray
    });

    chatAPI.add(msgData).then(() => {
      socket.emit("chat message", msgData);
    });
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
