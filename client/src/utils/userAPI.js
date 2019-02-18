import axios from "axios";

// The getRecipes method retrieves recipes from the server
// It accepts a "query" or term to search the recipe api for
export default {
  checkLogin() {
    return axios.get(`/api/checkLogin`);
  },
  findUserById: id => {
    return axios.get(`/api/users/find/${id}`);
  },
  registerUser(userData) {
    return axios.post(`/api/register`, userData);
  },
  logout() {
    return axios.get(`/api/logout`);
  },
  update(query) {
    return axios.post(`/api/update/`, query);
  }
};
