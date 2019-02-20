
const passport = require('passport'); // eslint-disable-line
const db = require('../Models');

module.exports = {
  add: (req, res) => {
    db.publicSell.create({
      userID: req.user,
      gameID: req.body.id,
      name: req.body.name,
      url: req.body.url,
      gameIndex: req.body.index,
    }).then((data) => {
      res.send(data);
    });
  },
  getPublicSell: (req, res) => {
    db.publicSell.find({
    }).then((data) => {
      res.send(data);
    });
  },
  findGame: (req, res) => {
    db.publicSell.findOne({
      _id: req.params.id,
    }).then((results) => {
      res.send(results);
    });
  },
  remove: (req, res) => {
    db.publicSell.find({
      _id: req.body.index,
    }).remove().then((done) => {
      res.send(done);
    });
  },

};
