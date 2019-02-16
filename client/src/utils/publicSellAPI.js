import axios from "axios";

export default {

	add: function (query) {
		return axios.post(`/api/add/publicSell`, query);
	},
	//removes an item from the games array
	updateSell: (query) => {
		return axios.post(`/api/remove/public/sell`, query)
	},
	getGames: () => {
		return axios.get(`/api/getPublicSell`);

	}
};
