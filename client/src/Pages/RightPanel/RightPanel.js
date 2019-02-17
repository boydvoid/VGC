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
		if (this.state.rightPanelOpen === true) {

			let query = document.getElementById("gameSearch").value;
			gamesAPI.gameSearch(query).then(data => {
				// this.setState({
				//   resultsSearchedGames: data
				// })
				console.log(data.data);
				//data.data[0].game.cover
				//get cover
				if (this.state.rightPanelOpen === true) {


					data.data.forEach(element => {

						this.coverSearch(element)

					});
				}
			})
		}
	};

	coverSearch = (query) => {
		//need to send game name and id to put in state
		if (query.game !== undefined && query.game.cover !== undefined) {

			gamesAPI.gameCover(query.game.cover).then(data => {
				let tempArray = this.state.resultsSearchedGames;
				if (data.data !== undefined && data.data[0] !== undefined && data.data[0].url !== undefined) {

					data.data[0].url = data.data[0].url.replace('t_thumb', 't_1080p');
					tempArray.push(
						{
							id: query.game.id,
							imgUrl: data.data[0].url,
							name: query.game.name
						});
					this.setState({
						resultsSearchedGames: tempArray
					})
				}
			})
		}
	};
 
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