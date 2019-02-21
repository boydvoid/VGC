import axios from "axios";

export default {
  getPopular() {
    return axios.get(`/api/popular`);
  },
  addGames: query => {
    return axios.post(`/api/games/add`, query);
  },
  gameSearch(query) {
    return axios.get(`/api/search/${query}`);
  },
  gameID(query) {
    return axios.get(`/api/games/id/${query}`);
  },
  gameCover(query) {
    return axios.get(`/api/games/covers/${query}`);
  },
  gameArtwork(query) {
    return axios.get(`/api/games/artwork/${query}`);
  },
  gameAgeRating(query) {
    return axios.get(`/api/games/ageRating/${query}`);
  },
  gameReleaseDate(query) {
    return axios.get(`/api/games/releaseDate/${query}`);
  },
  gameGenre(query) {
    return axios.get(`/api/games/genre/${query}`);
  },
  gameCompanyRole(query) {
    return axios.get(`/api/games/companyRole/${query}`);
  },
  gameCompanyName(query) {
    return axios.get(`/api/games/companyName/${query}`);
  },
  gameScreenshots(query) {
    return axios.get(`/api/games/screenshots/${query}`);
  },
  gameSeries(query) {
    return axios.get(`/api/games/series/${query}`);
  },
  gamePlatform(query) {
    return axios.get(`/api/games/platform/${query}`);
  },
  gameVideo(query) {
    return axios.get(`/api/games/video/${query}`);
  },
  gameWebsite(query) {
    return axios.get(`/api/games/website/${query}`);
  }
};
