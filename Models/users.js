const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  date: { type: Date, default: convertTimeDate() },
  theme: { type: Number, default: true },
  img: { type: String, required: false },
  userGames: { type: String },
  wishlist: { type: String },
  sell: { type: String },
  chats: { type: Array },
});

// Convert UTC to PST.
function convertTimeDate() {
  const date = new Date();
  const utcDate = new Date(date.toUTCString());
  utcDate.setHours(utcDate.getHours() - 8);
  const usDate = new Date(utcDate);

  return usDate;
}

const users = mongoose.model('users', userSchema);
userSchema.plugin(passportLocalMongoose);
module.exports = users;
