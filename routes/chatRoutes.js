const router = require('express').Router();
const chatController = require('../Controllers/chatController');

router
  .route('/chat/create')
  .post(chatController.create);

// removes an item from the games array


module.exports = router;
