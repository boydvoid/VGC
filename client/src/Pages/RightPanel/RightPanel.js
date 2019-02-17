import React, { Component } from 'react';
import './RightPanel.css';
import Button from '../../Components/Button/Button'
import PublicSell from '../../Components/PublicSell/PublicSell'
import gamesAPI from '../../utils/gamesAPI';
import publicSellAPI from '../../utils/publicSellAPI'
const fuzzysort = require('fuzzysort')
class RightPanel extends Component {

  state = {
    searchGamesInput: "",
    searchPublicSellInput: "",
    resultsSearchedGames: [],
    showPublicSell: false,
    resultsSearchedPublicSellGames: [],
    filteredGameResults: [],
    activeSearch: 'games'
  }

  handleChange = (event) => {
    let {name} = event.target;
    this.setState({
      [name]: event.target.value
    })
    if(event.target.value === "" ){
      this.setState({
        filteredGameResults: this.state.resultsSearchedPublicSellGames
      })
    } else {
      this.fuzzysearch();

    }
  }

  fuzzysearch = () => {
    let search = fuzzysort.go(this.state.searchPublicSellInput, this.state.resultsSearchedPublicSellGames, { keys: ['name']})
    let convertToArray = [];

    search.forEach(game => {
     convertToArray.push(game.obj) 
    });    
    if(this.state.searchPublicSellInput.length === "" ){
      this.setState({
        filteredGameResults: this.state.resultsSearchedPublicSellGames
      })
    } else {

      this.setState({
        filteredGameResults:convertToArray 
      })
    }
  }
  
	gameSearch = (event) => {

		event.preventDefault();


			let query = document.getElementById("gameSearch").value;

			gamesAPI.gameSearch(query).then(data => {

					let tempArray = [];

					console.log(data);

					for (let i = 0; i < data.data.length; i++) {

						let gameSeries;
						let gameModes = [];
						let gameCompanies = [];
						let gamePlatforms = [];
						let gameReleaseDate = [];
						let gameScreenshots = [];
						let gameWebsites = [];

						if (data.data[i].cover !== undefined && data.data[i].cover.url !== undefined) {

							// Replace image size.
							data.data[i].cover.url = data.data[i].cover.url.replace('t_thumb', 't_1080p');

							// Check if Game is part of a series.
							data.data[i].collection === undefined || data.data[i].collection.name === undefined ? gameSeries = 'No Series' : gameSeries = data.data[i].collection.name;

							// Check if Game has Game Modes listed.
							if (data.data[i].game_modes === undefined) {

								gameModes.push("Not Available")

							} else {

								for (let j = 0; j < data.data[i].game_modes.length; j++) {

									gameModes.push(data.data[i].game_modes[j].name);

								}
							}

							// Check if Game has Companies listed.
							if (data.data[i].involved_companies === undefined) {

								gameCompanies.push("Not Available")

							} else {

								for (let j = 0; j < data.data[i].involved_companies.length; j++) {

									gameCompanies.push(data.data[i].involved_companies[j].company.name);

								}
							}

							// Check if Game has platforms listed.
							if (data.data[i].platforms === undefined) {

								gamePlatforms.push("Not Available")

							} else {

								for (let j = 0; j < data.data[i].platforms.length; j++) {

									gamePlatforms.push(data.data[i].platforms[j].name);

								}
							}

							// Check if Game has Release Date listed.
							if (data.data[i].release_dates === undefined) {

								gameReleaseDate.push("Not Available")

							} else {

								for (let j = 0; j < data.data[i].release_dates.length; j++) {

									gameReleaseDate.push(data.data[i].release_dates[j].human);

								}
							}

							// Check if Game has screenshots listed.
							if (data.data[i].screenshots === undefined) {

								gameScreenshots.push("Not Available")

							} else {

								for (let j = 0; j < data.data[i].screenshots.length; j++) {

									gameScreenshots.push(data.data[i].screenshots[j].url);

								}
							}

							// Check if Game has websites listed.
							if (data.data[i].websites === undefined) {

								gameWebsites.push("Not Available")

							} else {

								for (let j = 0; j < data.data[i].websites.length; j++) {

									gameWebsites.push(data.data[i].websites[j].url);

								}
							}

							tempArray.push(
								{
									id: data.data[i].id,
									name: data.data[i].name,
									series: gameSeries,
									imgUrl: data.data[i].cover.url,
									gameModes: gameModes,
									company: gameCompanies,
									platform: gamePlatforms,
									releaseDate: gameReleaseDate,
									averageRating: data.data[i].aggregated_rating,
									averageRatingSources: data.data[i].aggregated_rating_count,
									screenshots: gameScreenshots,
									summary: data.data[i].summary,
									igdbLink: data.data[i].url,
									websites: gameWebsites
								});

							this.setState({
								resultsSearchedGames: tempArray
							});

						} else {

						}
					}


				
			})
	}

 
  togglePublicSell = () => {
		if (this.state.showPublicSell === false) {
      this.getGamesForSale();
      this.setState({
        activeSearch: 'sell'
      })
		} else {
			this.setState({
        showPublicSell: false,
        activeSearch: 'games'
			})

		}
	}
	getGamesForSale = () => {
		publicSellAPI.getGames().then(data => {
			this.setState({
        resultsSearchedPublicSellGames: data.data,
        filteredGameResults: data.data,
				showPublicSell: true
			})
		})
	}
  render () {
    return (
      <div id="mySidenav" className="sidenav">
        <div className="d-flex right-panel-nav justify-content-between align-items-center">
          <Button 
            text="&times;" 
            onclick={this.props.closeRightPanel} 
            class="closebtn" 
           />
          <div>
            <Button 
              class={this.state.activeSearch === 'games' ? "searchToggle toggleActive border-radius-left": "searchToggle border-radius-left"} 
              text={"Search for Games"} 
              onclick={this.state.showPublicSell ? this.togglePublicSell : ""} 
            />
            <Button 
              class={this.state.activeSearch === 'sell' ? "searchToggle toggleActive border-radius-right": "searchToggle border-radius-right"} 
              text={ "Games for Sale"} 
              onclick={this.state.showPublicSell ? "" : this.togglePublicSell} 
            />
          </div>
          <form className="searchForm">
            <input className="searchInput" id="gameSearch" type="text" placeholder="Search" name={this.state.showPublicSell ?"searchPublicSellInput" :"searchGamesInput" }  onChange={this.handleChange}/>
            {
              this.state.showPublicSell ? 
              "" 
              : 
              <Button class="search-btn" type="submit" text={<i className="fas fa-search"></i>} onclick={ this.state.showPublicSell ? "": this.gameSearch} />
            }
          </form>
        </div>
      {this.state.showPublicSell ?
        // show games for sale 
        <PublicSell 
        filteredGameResults={this.state.filteredGameResults} 
        getGamesForSale={this.getGamesForSale} 
        handleChange={this.handleChange}
        />
        :
  
        // show search list
        <div className="searchResults">
       
  
          {this.state.resultsSearchedGames.map((game, key) => {
            return (
              <div key={key}>
                <img className="search-img" src={game.imgUrl} />)
          <p>{game.name}</p>
                <Button text="Add to Collection" dataId={game.id} dataName={game.name} dataUrl={game.imgUrl} onclick={this.props.addToCollection} />
                <Button text="Add to Wishlist" dataId={game.id} dataName={game.name} dataUrl={game.imgUrl} />
              </div>
            )
          })}
        </div>
      }
  
    </div>
    )
  }
}
export default RightPanel;