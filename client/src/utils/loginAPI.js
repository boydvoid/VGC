import axios from "axios";

// The getRecipes method retrieves recipes from the server
// It accepts a "query" or term to search the recipe api for
export default {
  checkLogin: function () {
    return axios.get(`/api/checkLogin`);
  },
  findUserById: (id) => {
    return axios.get(`/api/users/find/${id}`)
  },
  registerUser: function (userData) {
    return axios.post(`/api/register`,userData);
  },
  logout: function() {
    return axios.get(`/api/logout`);
  }
};
