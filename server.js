const express = require('express');
const routes = require("./routes/apiRoutes");
const User = require("./routes/userRoutes");
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose')
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let bcrypt = require('bcrypt');
let db = require('./Models')
var expressValidator = require("express-validator");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressValidator());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


// mongo
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/games', { useNewUrlParser: true }).then(() => {
  console.log('connected')
});
//session
app.use(require("express-session")({
  secret: "Hello World, this is a session",
  resave: false,
  saveUninitialized: false
}));
//passport
app.use(passport.initialize());
app.use(passport.session());

// Define API routes here
app.use('/api', routes);
app.use('/api', User);

// Passport use
passport.use(new LocalStrategy(
  function (username, password, done) {

    console.log("Running");

    // When username is sent, find match in database.
    db.users.findOne({
      username: username
    }).then((user) => {

      if (user === null) {

        // User was not found in the database.
        done(null, false);

      }

      let passwordCheck = bcrypt.compareSync(password, user.password);

      // User was found in the database.
      if (passwordCheck === true) {

        return done(null, user.id);

      } else {

        return done(null, false);

      }

    }, (error) => {

      console.log(error);

    })
  }
));
// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Listening on PORT:  ${PORT}`);
})