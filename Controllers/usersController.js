const db = require('../Models');
const passport = require('passport');

module.exports = {
  checkLogin: (req, res) => {
    if(req.isAuthenticated()){
      //send user id to client
      res.send(req.user)
    }
   },
  findById: function (req, res) {
    db.users.findOne({
      _id: req.params.id
    }).then(userInfo => {
      res.send(userInfo)
    })
  }
}