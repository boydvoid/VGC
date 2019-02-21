import axios from "axios";

export default {
  create: query => {
    return axios.post(`/api/message/create`, query);
  },

  getMessage: query => {
    return axios.get(`/api/message/get/${query}`);
  },
  add: query => {
    return axios.post(`/api/message/add`, query);
  },
  getChatByUser2: query => {
    return axios.get(`/api/chat/username/${query}`);
  }
};
