const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  date: { type: Date, default: convertTimeDate() },
  gameID: { type: String, required: true },
  messages: { type: Array, required: true },
  user1: { type: String, required: true },
  user2: { type: String, required: true },
  read: {type: Boolean}
});

// Convert UTC to PST.
function convertTimeDate() {
  const date = new Date();
  const utcDate = new Date(date.toUTCString());
  utcDate.setHours(utcDate.getHours() - 8);
  const usDate = new Date(utcDate);

  return usDate;
}

const chat = mongoose.model('chat', chatSchema);
module.exports = chat;
