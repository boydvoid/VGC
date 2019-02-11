var passport = require('passport');
var bcrypt = require('bcrypt');
let db = require('../Models');
let saltRounds = 10;
const router = require("express").Router();
const usersController = require('../Controllers/usersController');

router
  .route("/checkLogin")
  .get(usersController.checkLogin)

router
  .route("/users/find/:id")
  .get(usersController.findById)

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
  req.checkBody('username', 'Username cannot be empty.').notEmpty();
  req.checkBody('email', 'Email field must not be empty.').notEmpty();
  req.checkBody('email', 'Email field must be and email.').isEmail();
  req.checkBody('password', 'Password must be 8 characters long.').len(8, 100);
  req.checkBody('passwordMatch', 'Password must be 8 characters long.').len(8, 100);
  req.checkBody('passwordMatch', 'Password must be 8 characters long.').equals(req.body.password);

  var errors = req.validationErrors();

  if (errors) {

    res.send(errors)
  } else {
    //hash the password 
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(req.body.password, salt);
    //bcrypt the password then insert

        db.users.create({
          username: req.body.username,
          email: req.body.email,
          password: hash,
          theme: 0
        }).then((created) => {
            req.login(created._id, (err) => {
                res.send(true)
            })
        })
        .catch(err => {
          //create user errors
          //either duplicate username or email
          console.log(err.errmsg)
          let data = [err.errmsg]
          res.send(data) 
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

