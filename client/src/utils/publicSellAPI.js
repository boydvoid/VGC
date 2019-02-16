import axios from "axios";

export default {
	create: () => {
		return axios.post(`/api/create/public/sell`)
	},
	add: function (query) {
		return axios.post(`/api/add/public/sell`,query);
	},
	//removes an item from the games array
	updateSell: (query) => {
		return axios.post(`/api/remove/public/sell`, query)
	},
	getSell: () => {
		return axios.get(`/api/getPublicSell`);
		
	}
};
