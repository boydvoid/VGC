const passport = require('passport');
const db = require('../Models');
// we need passport for req.user easy way to get user id

module.exports = {
  create: (req, res) => {
    console.log('run');
    db.wishlist.create({
      userID: req.user,
      data: [],
    }).then((data) => {
      db.users.findByIdAndUpdate(
        { _id: req.user },
        { wishlist: data._id },
      ).then((done) => {
        res.send(done);
      });
    });
  },
  add: (req, res) => {
    console.log(req.body)
    db.wishlist.find({
      userID: req.user,
    }).then((games) => {
      const insert = {
        id: req.body.id,
        name: req.body.name,
        url: req.body.url,
        index: Math.floor(Math.random() * 100000000000) + 1,
      };
      db.wishlist.findOneAndUpdate({
        userID: req.user,
      },
        { $push: { data: insert } }).then((done) => {
          res.send(insert);
        });
    });
  },
  // removes an item from games collection
  updateGames: (req, res) => {
    db.wishlist.findOneAndUpdate(
      { userID: req.user },
      { $pull: { data: req.body } },
    ).then((done) => {
      res.send(done);
    })
      .catch((err) => {
        res.send(err);
      });
  },
  getGames: (req, res) => {
    db.wishlist.findOne({
      userID: req.user,
    }).then((data) => {
      if (data !== null) {

        res.send(data.data);
      }
      else {
        res.send([])
      }
    });
  },
};
