const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;

const ourGamesSchema = new Schema({
  date: { type: Date, default: convertTimeDate() },
  data: {type: Object, required: true},
});

// Convert UTC to PST.
function convertTimeDate() {

  let date = new Date();
  let utcDate = new Date(date.toUTCString());
  utcDate.setHours(utcDate.getHours()-8);
  let usDate = new Date(utcDate);

  return usDate;

}

const ourGames = mongoose.model("ourGames", ourGamesSchema);
module.exports = ourGames;