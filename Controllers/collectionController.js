
const db = require('../Models');
//we need passport for req.user easy way to get user id 
const passport = require('passport');

module.exports = {
  create: (req, res) => {
    db.userGames.create({
      userID: req.user,
      data: []
    }).then(data => {
      db.users.findByIdAndUpdate(
        {_id: req.user},
        {userGames: data._id}
        
      ).then(done => {
        res.send(done)
      })
    })
  },
 add: (req, res) => {
   db.userGames.find({
     userID: req.user
   }).then(games => {
     let insert = {
       id: req.body.id,
       name: req.body.name,
       url: req.body.url,
       index: Math.floor(Math.random() * 100000000000) + 1 
     }
   db.userGames.findOneAndUpdate({
      userID: req.user},
      {$push: {data: insert}}
      ).then(done => {
        res.send(insert);
      })

   })
 },
 //removes an item from games collection
 updateGames: (req, res) => {
   db.userGames.findOneAndUpdate(
     { userID: req.user},
     {$pull: {data: req.body}} 
     ).then(done => {
       res.send(done)
     })
     .catch(err => {
       res.send(err)
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