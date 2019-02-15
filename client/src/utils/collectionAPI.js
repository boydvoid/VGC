import axios from "axios";

export default {
	create: () => {
		return axios.post(`/api/create/collection`)
	},
	add: function (query) {
		return axios.post(`/api/add/`,query);
	},
	getGames: () => {
		return axios.get(`/api/getGames`);
	}
};
