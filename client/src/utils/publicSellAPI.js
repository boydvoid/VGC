import axios from "axios";

export default {
  add: query => {
    return axios.post(`/api/add/publicSell`, query);
  },
  // removes an item from the games array
  removeSell: query => {
    return axios.post(`/api/remove/public/sell`, query);
  },
  getGames: () => {
    return axios.get(`/api/getPublicSell`);
  },
  findGame: query => {
    return axios.get(`/api/find/game/${query}`);
  }
};
