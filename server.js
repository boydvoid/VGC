const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const expressValidator = require('express-validator');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

// socket.io
const http = require('http');
const socketIO = require('socket.io');
const db = require('./Models');
const publicSell = require('./routes/publicSellRoutes');
const sellRoutes = require('./routes/sellRoutes');
const collectionRoutes = require('./routes/collectionRoutes');
const User = require('./routes/userRoutes');
const routes = require('./routes/apiRoutes');
const chat = require('./routes/chatRoutes');

const server = http.createServer(app);
const io = socketIO(server);
const users = [];
const connections = [];

io.sockets.on('connection', (socket) => {
  connections.push(socket);
  console.log('connected: %s connected', connections.length);

  // disconnect
  socket.on('disconnect', () => {
    if (!socket.username) return;
    users.splice(users.indexOf(socket.username), 1);
    connections.splice(connections.indexOf(socket), 1);

    console.log('Disconnected: %s sockets connected', connections.length);
  });

  socket.on('USER_CONNECTED', (username) => {
    console.log(username);
    users.push(username);
    socket.username = username;
  });
  socket.on('chat message', (msg) => {
    console.log(msg);
    io.sockets.in(msg.chatId).emit('getting message', msg);
  });
  socket.on('added to collection', (data) => {
    io.emit('added to collection', { data, username: socket.username });
  });

  socket.on('removed from collection', (data) => {
    io.emit('removed from collection', { data, username: socket.username });
  });
  socket.on('removed from sell', (data) => {
    io.emit('removed from sell', { data, username: socket.username });
  });

  socket.on('chat started', (data) => {
    console.log(data.id);
    socket.join(data.id);
    io.emit('chat started', { data, username: socket.username });
  });

  socket.on('join active', (data) => {
    console.log(`active${data._id}`);
    socket.join(data._id);
  });

  socket.on('user 1 chat setup', (data) => {
    io.emit('user 1 chat setup', data);
  });

  socket.on('message added to db', (msg) => {
    io.emit('message added to db', msg);
  });
  socket.on('chat notification', (data) => {
    io.emit('chat notification', { data, username: socket.username });
  });
});

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressValidator());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}


// mongo
mongoose.connect(process.env.MONGOLAB_ORANGE_URI || 'mongodb://localhost/games', { useNewUrlParser: true }).then(() => {
  console.log('connected');
});

// store the session in mongo db
const store = new MongoDBStore({
  uri: process.env.MONGOLAB_ORANGE_URI || 'mongodb://localhost/games',
  collection: 'sessions',
});

store.on('error', (error) => {
  console.log(error);
});


// session
app.use(session({
  secret: 'did you know that a platypus is a mammal that lays eggs?',
  resave: false,
  saveUninitialized: false,
  store,
}));
// passport
app.use(passport.initialize());
app.use(passport.session());

// Define API routes here
app.use('/api', routes);
app.use('/api', User);
app.use('/api', collectionRoutes);
app.use('/api', sellRoutes);
app.use('/api', publicSell);
app.use('/api', chat);

// Passport use
passport.use(new LocalStrategy(
  ((username, password, done) => {
    // When username is sent, find match in database.
    db.users.findOne({
      username,
    }).then((user) => {
      if (user === null) {
        // User was not found in the database.
        done(null, false);
      }
      const passwordCheck = bcrypt.compareSync(password, user.password);

      // User was found in the database.
      if (passwordCheck === true) {
        return done(null, user.id);
      }

      return done(null, false);
    }, (error) => {
      console.log(error);
    });
  }),
));
// Send every other request to the React app
// Define any API routes before this runs
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

server.listen(PORT, () => {
  console.log(`Listening on PORT:  ${PORT}`);
});
