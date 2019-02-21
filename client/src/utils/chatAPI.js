import axios from "axios";

export default {
  create: query => {
    return axios.post(`/api/chat/create`, query);
  },

  getChat: query => {
    return axios.get(`/api/chat/get/${query}`);
  },
  add: query => {
    return axios.post(`/api/chat/add`, query);
  },
  addMessage: query => {
    return axios.post(`/api/chat/message`, query);
  },
  getChatByUser2: query => {
    return axios.get(`/api/chat/username/${query}`);
  }
};
