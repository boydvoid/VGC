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
	}
};
