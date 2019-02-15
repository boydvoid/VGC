import axios from "axios";

export default {
	create: () => {
		return axios.post(`/api/create/collection`)
	},
	add: function (query) {
		return axios.post(`/api/add/`,query);
	},
	remove: (query) => {
		return axios.delete(`/api/remove/game`, query)
	},
	getGames: () => {
		return axios.get(`/api/getGames`);
		
	}
};
