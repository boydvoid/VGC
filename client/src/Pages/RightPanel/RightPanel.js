import React, { Component } from "react";
import "./RightPanel.css";
import Button from "../../Components/Button/Button";
import PublicSell from "../../Components/PublicSell/PublicSell";
import gamesAPI from "../../utils/gamesAPI";
import publicSellAPI from "../../utils/publicSellAPI";

const fuzzysort = require("fuzzysort");

class RightPanel extends Component {
  state = {
    sInputGames: "",
    sInputSell: "",
    sResultsGames: [],
    sToggleSell: false,
    sResultsSell: [],
    sResultsFiltered: [],
    sToggleActiveSearch: "games",
    socket: this.props.socket
  };

  componentWillMount = () => {
    this.socketFunction();
  };

  socketFunction = () => {
    const { socket } = this.state;
  };

  handleChange = event => {
    const { sResultsSell } = this.state;
    const { name } = event.target;
    this.setState({
      [name]: event.target.value
    });
    if (event.target.value === "") {
      this.setState({
        sResultsFiltered: sResultsSell
      });
    } else {
      this.fuzzysearch();
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
