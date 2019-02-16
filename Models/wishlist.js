const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
	date: {type: Date, default: convertTimeDate()},
	userID: {type: Number, required: true},
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

const wishlist = mongoose.model("wishlist", wishlistSchema);
module.exports = wishlist;