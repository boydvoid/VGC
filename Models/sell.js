const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;

const sellSchema = new Schema({
	date: {type: Date, default: convertTimeDate()},
	userID: {type: String, required: true},
	data: {type: Array, required: true}
});

// Convert UTC to PST.
function convertTimeDate() {

	let date = new Date();
	let utcDate = new Date(date.toUTCString());
	utcDate.setHours(utcDate.getHours() - 8);
	let usDate = new Date(utcDate);

	return usDate;

}

const sell = mongoose.model("sell", sellSchema);
module.exports = sell;