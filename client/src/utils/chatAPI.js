import axios from "axios";

export default {
  create: query => {
    return axios.post(`/api/chat/create`, query);
  }
};
