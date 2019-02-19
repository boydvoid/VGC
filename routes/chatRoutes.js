const router = require('express').Router();
const chatController = require('../Controllers/chatController');

router
  .route('/chat/create')
  .post(chatController.create);

router
  .route('/chat/get/:id')
  .get(chatController.getChat);

router
  .route('/chat/add')
  .post(chatController.add);

module.exports = router;
