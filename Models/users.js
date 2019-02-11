const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  username: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
  theme: { type: Number, default: true }
});
const users = mongoose.model("users", userSchema);
userSchema.plugin(passportLocalMongoose);
module.exports = users;