var passport = require('passport');
var bcrypt = require('bcrypt');
let db = require('../Models');
let saltRounds = 10;
const router = require("express").Router();

//check login
router.get("/checkLogin", (req, res) => {
  console.log("users id " + req.user);
  // let userId = checkForMultipleUsers(req);
  userId = req.user;
  if (req.isAuthenticated()) {
    db.users.findOne({
      _id: userId
    }).then((userInfo) => {
      res.send(userInfo)
    })
  } else {
    //no user
    res.send(false);
  }
})

//login
router.post("/login", passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/',
}));

//logout
router.get('/logout', function (req, res) {
  req.logout();
  res.send(false)
});

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


    //check if a username exists in the db, if it doesn't create the user
    db.users.find({
      username: req.body.username
    }).then(user => {
      if (user.length === 0) {
        db.users.create({
          username: req.body.username,
          email: req.body.email,
          password: hash,
          theme: 1
        }).then(created => {
          req.login(created._id, (err) => {
          })
        })
      } else {
        //user wasn't created
        res.send(false);
      }
    })
  }
});


//req.login uses these functions 
passport.serializeUser(function (user_id, done) {
  done(null, user_id)
})
//this gets the users info
passport.deserializeUser(function (user_id, done) {
  done(null, user_id);
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

