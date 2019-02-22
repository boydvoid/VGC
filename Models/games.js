const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;

const gamesSchema = new Schema({
  gameName: { type: String },
  ageRating: { type: String },
  avgRating: { type: Number },
  avgRatingSources: { type: Number },
  companies: { type: Array },
  cover: { type: String },
  gameID: { type: Number },
  gameModes: { type: Array },
  igdbURL: { type: String },
  genres: { type: Array },
  videos: { type: Array },
  platform: { type: Array },
  releaseDate: { type: Array },
  screenshots: { type: String },
  series: { type: Array },
  summary: { type: String },
  websites: { type: Array },
});

const gamesInfo = mongoose.model('gamesInfo', gamesSchema);
module.exports = gamesInfo;
