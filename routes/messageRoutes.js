const router = require('express').Router();
const messageController = require('../Controllers/messageController');

router
  .route('/message/create')
  .post(messageController.create);

  router
  .route('/message/get/:id')
  .get(messageController.getMessage);

module.exports = router;
