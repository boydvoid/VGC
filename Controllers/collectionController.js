
const db = require('../Models');
//we need passport for req.user easy way to get user id 
const passport = require('passport');

module.exports = {
  create: (req, res) => {
    db.userGames.create({
      userID: req.user,
      data: []
    }).then(data => {
      res.send(data)
    })
  },
 add: (req, res) => {
   console.log(req.body)
   db.userGames.findOneAndUpdate({
      userID: req.user},
      {$push: {data: req.body}}
      ).then(done => {
        res.send(done);
      })
 },
 getGames: (req, res) => {
   db.userGames.findOne({
     userID: req.user
   }).then(data => {
     console.log(data.data)
     res.send(data.data)
   })
 }
}