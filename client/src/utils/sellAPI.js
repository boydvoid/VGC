import axios from "axios";

export default {
  create: () => {
    return axios.post(`/api/create/sell`);
  },
  add: query => {
    return axios.post(`/api/add/sell`, query);
  },
  // removes an item from the users sell array
  updateSell: query => {
    return axios.post(`/api/remove/sell`, query);
  },
  getSell: () => {
    return axios.get(`/api/getSell`);
  }
};
