const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
  date: { type: Date, default: convertTimeDate() },
  userID: { type: String, required: true },
  data: { type: Array, required: true },
});

// Convert UTC to PST.
function convertTimeDate() {
  const date = new Date();
  const utcDate = new Date(date.toUTCString());
  utcDate.setHours(utcDate.getHours() - 8);
  const usDate = new Date(utcDate);

  return usDate;
}

const wishlist = mongoose.model('wishlist', wishlistSchema);
module.exports = wishlist;
