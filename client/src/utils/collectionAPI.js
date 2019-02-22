import axios from "axios";

export default {
  create: () => {
    return axios.post(`/api/create/collection`);
  },
  add(query) {
    return axios.post(`/api/add/`, query);
  },
  // removes an item from the games array
  updateGames: query => {
    return axios.post(`/api/remove/game`, query);
  },
  getGames: () => {
    return axios.get(`/api/getGames`);
  },
  getGameById: id => {
    return axios.get(`/api/collection/game/${id}`);
  }
};
