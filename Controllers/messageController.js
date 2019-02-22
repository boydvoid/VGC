const passport = require('passport');
const db = require('../Models');
// we need passport for req.user easy way to get user id

module.exports = {
  create: (req, res) => {
		console.log(req.body)
    db.message.create({
      chatId: req.body.chatId,
      message: req.body.message,
      sender: req.body.sender,
      receiver: req.body.receiver,
      read: false
    }).then((data) => {
      res.send(data);
    });
  },
  getMessage: (req, res) => {
    db.message.findById({
      _id: req.params.id,
    }).then((message) => {
      res.send(message);
    });
  },
  getmessageByUser2: (req, res) => {
    db.message.findOne({
      user2: req.params.username,
    }).then((message) => {
      res.send(message);
    });
  },
  add: (req, res) => {
    console.log(req.body);
    db.message.findOneAndUpdate({
      _id: req.body.messageId,
    },
    { $push: { messages: req.body } }).then((done) => {
      res.send(done);
    }).catch((err) => {
      console.log(err);
    });
  },
  updateReadTrue: (req, res )=>{
    db.message.findOneAndUpdate({
      _id: req.body.messageId
    },
    {read: true}).then(done => {
      res.send(done);
    })
  }
};
