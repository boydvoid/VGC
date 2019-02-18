const passport = require('passport');
const db = require('../Models');
// we need passport for req.user easy way to get user id

module.exports = {
  create: (req, res) => {
    db.sell.create({
      userID: req.user,
      data: [],
    }).then((data) => {
      db.users.findByIdAndUpdate(
        { _id: req.user },
        { sell: data._id },
      ).then((done) => {
        res.send(done);
      });
    });
  },
  add: (req, res) => {
    db.sell.find({
      userID: req.user,
    }).then((games) => {
      const insert = {
        id: req.body.id,
        name: req.body.name,
        url: req.body.url,
        index: req.body.index,
      };
      db.sell.findOneAndUpdate({
        userID: req.user,
      },
      { $push: { data: insert } }).then((done) => {
        res.send(insert);
      });
    });
  },
  // removes an item from games collection
  updateSell: (req, res) => {
    db.sell.findOneAndUpdate(
      { userID: req.user },
      { $pull: { data: req.body } },
    ).then((done) => {
      res.send(done);
    })
      .catch((err) => {
        res.send(err);
      });
  },
  getSell: (req, res) => {
    db.sell.findOne({
      userID: req.user,
    }).then((data) => {
      res.send(data.data);
    });
  },
};
