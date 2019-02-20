const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;

const gamesSchema = new Schema({
  // avgRating: { type: Number, required: false,},
  // avgRatingSources: { type: Number, required: false,},
  // companies: { type: String, required: false,},
  // cover: { type: String, required: false,},
  gameID: { type: Number, required: false,},
  // gameModes: { type: String, required: false,},
  // igdbURL: { type: String, required: false,},
  // platform: { type: String, required: false,},
  // releaseDate: { type: String, required: false,},
  // screenshots: { type: String, required: false,},
  // series: { type: String, required: false,},
  // summary: { type: String, required: false,},
  // websites: { type: String, required: false,},
});

const gamesInfo = mongoose.model('gamesInfo', gamesSchema);
module.exports = gamesInfo;
