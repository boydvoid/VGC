var passport = require('passport');
var bcrypt = require('bcrypt');
let db = require('../Models');
let saltRounds = 10;
const router = require("express").Router();
const expressValidator = require('express-validator/check');

//check login
router.get("/checkLogin", (req, res) => {
  let userId = checkForMultipleUsers(req);

  if (req.isAuthenticated()) {
    db.users.findOne({
      _id: userId
    }).then((userInfo) => {
      res.send(userInfo)
    })
  } else {
    res.send("no user");
  }
})

router.post("/login", passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/',
}));


// Create a new user
router.post("/register", function (req, res) {
  console.log('clicked register')
  console.log(req.body)
  req.checkBody('username', 'Username cannot be empty.').notEmpty();
  req.checkBody('email', 'Email field must not be empty.').notEmpty();
  req.checkBody('email', 'Email field must be and email.').isEmail();
  req.checkBody('password', 'Password must be 8 characters long.').len(8, 100);
  req.checkBody('passwordMatch', 'Password must be 8 characters long.').len(8, 100);
  req.checkBody('passwordMatch', 'Password must be 8 characters long.').equals(req.body.password);

  var errors = req.validationErrors();

  //if there are errors display them on screen 
  if (errors) {
    //console.log(`errors: ${JSON.stringify(errors)}`)

    res.send(errors)
  } else {
    //hash the password 
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(req.body.password, salt);
    //bcrypt the password then insert


    //find user
    db.users.find({
      username: req.body.username
    }).then(user => {
      console.log("user" + user)
      if (user.length === 0) {
        db.users.create({
          username: req.body.username,
          email: req.body.email,
          password: hash,
          theme: 1
        }).then(created => {
          console.log(`created: ${created}`)
          console.log(`user ${JSON.stringify(user.id)}`);
        })
      } else {
        res.send("Already a user");
      }
    })
  }
});
module.exports = router;


function checkForMultipleUsers(req) {
  let userId;

  //check if req.user is an object, if there are multiple users in a table than it is, if there's one than it's not
  if (typeof req.user !== 'object') {
    return userId = req.user
  } else {
    return userId = req.user.id
  }
}

//req.login uses these functions 
passport.serializeUser(function (user_id, done) {
  done(null, user_id)
})
//this gets the users info
passport.deserializeUser(function (user_id, done) {
  done(null, user_id);
});