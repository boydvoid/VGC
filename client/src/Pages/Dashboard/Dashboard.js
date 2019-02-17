import React, {Component} from 'react';
import userAPI from '../../utils/userAPI';

import gamesAPI from '../../utils/gamesAPI';
import SidePanel from '../../Components/SidePanel/SidePanel';
import Searchbar from '../../Components/Searchbar/Searchbar';
import './Dashboard.css';
import RightPanel from '../../Components/RightPanel/RightPanel';
import Chat from '../../Components/Chat/Chat'
import collectionAPI from '../../utils/collectionAPI';

class Dashboard extends Component {

	state = {

		theme: this.props.theme,
		searchedGames: [],
		rightPanelOpen: false,
		chatboxExpanded: false,
		socket: this.props.socket,
		coversID: []
	};


	componentDidMount = () => {
		this.switchState();
	};

	logout = () => {
		userAPI.logout().then(() => {
			//reload the window on sucessful logout
			window.location.reload();
		});
	};

	//check the state of the theme toggle on the dashboard
	switchState = () => {
		if (this.props.theme === 1) {
			document.getElementById("switch").checked = false;
		} else if (this.props.theme === 2) {
			document.getElementById("switch").checked = true;
		}
	};


	toggleTheme = () => {
		if (this.state.theme === 1) {
			let data = {
				theme: 2
			};
			userAPI.update(data).then(() => {
				this.setState({
					theme: 2
				});

				document.getElementById("theme-div").classList.remove("light-theme");
				document.getElementById("theme-div").classList.add("dark-theme")
			})
		} else {

			let data = {
				theme: 1
			};
			userAPI.update(data).then(() => {
				this.setState({
					theme: 1
				})
			});
			document.getElementById("theme-div").classList.remove("dark-theme");
			document.getElementById("theme-div").classList.add("light-theme")
		}
	};

	openRightPanel = () => {
		document.getElementById("mySidenav").style.right = "0px";
		this.setState({
			rightPanelOpen: true,
		})
	};

	closeRightPanel = () => {
		document.getElementById("mySidenav").style.right = "-900px";
		this.setState({
			rightPanelOpen: false,
		})
	};

	gameSearch = (event) => {

		event.preventDefault();

		if (this.state.rightPanelOpen === true) {

			let query = document.getElementById("gameSearch").value;

			gamesAPI.gameSearch(query).then(data => {

				if (this.state.rightPanelOpen === true) {

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
								searchedGames: tempArray
							});

						} else {

						}
					}

					console.log(this.state.searchedGames);

				}
			})
		}
	};

	expandChatBox = () => {
		if (this.state.chatboxExpanded === false) {
			this.setState({
				chatboxExpanded: true
			})
		} else {
			this.setState({
				chatboxExpanded: false
			})
		}
	};

	// receive msg
	sendMsg = (event) => {
		event.preventDefault();
		const {socket} = this.state;
		//change to state later
		let msg = document.getElementById('chatInput');

		socket.emit('chat message', msg.value);
		msg.value = "";

		socket.on('chat message', (msg) => {
			let msgP = document.createElement("p").text = msg;
			document.getElementById('msgs').append(msgP);
		});

	};

	addToCollection = (event) => {
		let id = event.target.attributes.getNamedItem('data-id').value;
		let name = event.target.attributes.getNamedItem('data-name').value;
		let url = event.target.attributes.getNamedItem('data-url').value;
		let data = {
			id: id,
			name: name,
			url: url,
			index: ""
		};
		collectionAPI.add(data).then((done) => {
			//live update with reloading page
			const {socket} = this.state;
			socket.emit('added to collection', done);

		})
	};

	addToWishlist = () => {

	};

	render() {
		return (
			<div>

				{/* chat */}
				<Chat titleClick = {this.expandChatBox} chatExpanded = {this.state.chatboxExpanded} sendMsg = {this.sendMsg}/>
				{/* right panel */}
				<RightPanel closeRightPanel = {this.closeRightPanel} searchedGames = {this.state.searchedGames} gameSearch = {this.gameSearch}
					addToCollection = {this.addToCollection}/>
				{/* nav panel */}
				<SidePanel username = {this.props.username} buttonClick = {this.logout} buttonText = {"Logout"} profileImg = {this.props.profileImg}
					active = {this.props.active}/>

				<div className = "content container-fluid">
					<Searchbar themeChecked = {this.props.themeChecked} toggleTheme = {this.toggleTheme} openRightPanel = {this.openRightPanel}
						closeRightPanel = {this.closeRightPanel}/>
					{this.props.children}
				</div>

			</div>

		)

	}

}


export default Dashboard;