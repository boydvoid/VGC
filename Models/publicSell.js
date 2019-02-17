const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;

const publicSellSchema = new Schema({
  date: { type: Date, default: convertTimeDate() },
  gameID: { type: String, required: true },
  userID: { type: String, required: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
  gameIndex: { type: String, required: true }
});

// Convert UTC to PST.
function convertTimeDate() {

  let date = new Date();
  let utcDate = new Date(date.toUTCString());
  utcDate.setHours(utcDate.getHours() - 8);
  let usDate = new Date(utcDate);

	return usDate;

}

const publicSell = mongoose.model("publicSell", publicSellSchema);
module.exports = publicSell;