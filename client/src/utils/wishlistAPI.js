import axios from "axios";

export default {
  create: () => {
    return axios.post(`/api/create/wishlist`);
  },
  add(query) {
    return axios.post(`/api/wishlist/add`, query);
  },
  // removes an item from the games array
  updateGames: query => {
    return axios.post(`/api/wishlist/remove/game`, query);
  },
  getGames: () => {
    return axios.get(`/api/wishlist/getGames`);
  }
};
