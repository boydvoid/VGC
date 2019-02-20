import axios from "axios";

export default {
	getPopular: function () {
		return axios.get(`/api/popular`);
	},
	addGames: query => {
		return axios.post(`/api/games/add`, query);
	},
	gameSearch: function (query) {
		return axios.get(`/api/search/${query}`);
	},
	gameID: function (query) {
		return axios.get(`/api/games/${query}`);
	},
	gameCover: function (query) {
		return axios.get(`/api/games/covers/${query}`);
	},
	gameArtwork: function (query) {
		return axios.get(`/api/games/artwork/${query}`);
	},
	gameAgeRating: function (query) {
		return axios.get(`/api/games/ageRating/${query}`);
	},
	gameReleaseDate: function (query) {
		return axios.get(`/api/games/releaseDate/${query}`);
	},
	gameGenre: function (query) {
		return axios.get(`/api/games/genre/${query}`);
	},
	gameCompanyRole: function (query) {
		return axios.get(`/api/games/companyRole/${query}`);
	},
	gameCompanyName: function (query) {
		return axios.get(`/api/games/companyName/${query}`);
	},
	gameScreenshots: function (query) {
		return axios.get(`/api/games/screenshots/${query}`);
	},
	gameSeries: function (query) {
		return axios.get(`/api/games/series/${query}`);
	},
	gamePlatform: function (query) {
		return axios.get(`/api/games/platform/${query}`);
	},
	gameVideo: function (query) {
		return axios.get(`/api/games/video/${query}`);
	},
	gameWebsite: function (query) {
		return axios.get(`/api/games/website/${query}`);
	}
};
