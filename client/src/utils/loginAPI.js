import axios from "axios";

// The getRecipes method retrieves recipes from the server
// It accepts a "query" or term to search the recipe api for
export default {
  checkLogin: function () {
    return axios.get(`/api/checkLogin`);
  },
  registerUser: function () {
    return axios.post(`/api/register`);
  },
};
