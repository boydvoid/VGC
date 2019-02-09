import axios from "axios";

// The getRecipes method retrieves recipes from the server
// It accepts a "query" or term to search the recipe api for
export default {
	gameSearch: function(query) {
		return axios.get(`/api/search/${query}`);
	},
	gamesNewest: function() {
		return axios.get(`/api/popularity`);
	},

	coverSearch: function(query) {
		return axios.get(`/api/games/covers/${query}`);
	}
};
