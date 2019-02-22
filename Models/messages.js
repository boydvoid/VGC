const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  date: { type: Date, default: convertTimeDate() },
  chatId: { type: String, required: true },
  message: { type: String, required: true },
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
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

const message = mongoose.model('message', messageSchema);
module.exports = message;
