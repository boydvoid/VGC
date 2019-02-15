const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;

const userGamesSchema = new Schema({
  date: { type: Date, default: convertTimeDate() },
  userID: {type: String, required: true},
  data: {type: Array, required: true}
});

// Convert UTC to PST.
function convertTimeDate() {

  let date = new Date();
  let utcDate = new Date(date.toUTCString());
  utcDate.setHours(utcDate.getHours()-8);
  let usDate = new Date(utcDate);

  return usDate;

}

const userGames = mongoose.model("userGames", userGamesSchema);
module.exports = userGames;