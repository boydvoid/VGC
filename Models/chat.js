const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  date: { type: Date, default: convertTimeDate() },
  gameID: {type: Number, required: true},
  messages: {type: Object, required: true},
  user1: {type: Number, required: true},
  user2: {type: Number, required: true},
});

// Convert UTC to PST.
function convertTimeDate() {

  let date = new Date();
  let utcDate = new Date(date.toUTCString());
  utcDate.setHours(utcDate.getHours()-8);
  let usDate = new Date(utcDate);

  return usDate;

}

const chat = mongoose.model("chat", chatSchema);
module.exports = chat;