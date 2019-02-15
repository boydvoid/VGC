const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;

const publicSellSchema = new Schema({
  date: { type: Date, default: convertTimeDate() },
  gameID: {type: Number, required: true},
  userID: {type: Number, required: true},
});

// Convert UTC to PST.
function convertTimeDate() {

  let date = new Date();
  let utcDate = new Date(date.toUTCString());
  utcDate.setHours(utcDate.getHours()-8);
  let usDate = new Date(utcDate);

  return usDate;

}

const publicSell = mongoose.model("publicSell", publicSellSchema);
module.exports = publicSell;