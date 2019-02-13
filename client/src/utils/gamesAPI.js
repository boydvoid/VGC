import axios from "axios";

export default {
	gameSearch: function (query) {
		return axios.get(`/api/search/${query}`);
	},
	getPopular: function () {
		return axios.get(`/api/popular`);
	},
	coverSearch: function (query) {
		return axios.get(`/api/games/covers/${query}`);
	},
	gameArtwork: function (query) {
		return axios.get(`/api/games/artwork/${query}`);
	},
	gameAgeRating: function (query) {
		return axios.get(`/api/games/ageRating/${query}`);
	}
};
