import React, { Component } from 'react';
import userAPI from '../../utils/userAPI';
import SidePanel from '../../Components/SidePanel/SidePanel';
import Searchbar from '../../Components/Searchbar/Searchbar';
import './Dashboard.css';
import RightPanel from '../../Pages/RightPanel/RightPanel';
import Chat from '../../Components/Chat/Chat'
import collectionAPI from '../../utils/collectionAPI';

class Dashboard extends Component {

	state = {

		theme: this.props.theme,
		searchedGames: [],
		rightPanelOpen: false,
		chatboxExpanded: false,
		publicSellGames: [],
		socket: this.props.socket
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
		const { socket } = this.state;
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
		}
		collectionAPI.add(data).then((done) => {
			//live update with reloading page
			const { socket } = this.state;
			socket.emit('added to collection', done);

		})
	}


	addToWishlist = () => {

	}
	render() {
		return (
			<div>

				{/* chat */}
				<Chat titleClick={this.expandChatBox} chatExpanded={this.state.chatboxExpanded} sendMsg={this.sendMsg} />
				{/* right panel */}
				<RightPanel   closeRightPanel={this.closeRightPanel} searchedGames={this.state.searchedGames}  addToCollection={this.addToCollection} />
				{/* nav panel */}
				<SidePanel username={this.props.username} buttonClick={this.logout} buttonText={"Logout"} profileImg={this.props.profileImg}
					active={this.props.active} />

				<div className="content container-fluid">
					<Searchbar themeChecked={this.props.themeChecked} toggleTheme={this.toggleTheme} openRightPanel={this.openRightPanel}
						closeRightPanel={this.closeRightPanel} />
					{this.props.children}
				</div>

			</div>

		)

	}

}


export default Dashboard;