const router = require('express').Router();
const gamesController = require('../Controllers/gamesController');

router
  .route('/games/add')
  .post(gamesController.add);


router
  .route('/games/id/:id')
  .get(gamesController.gameID);

module.exports = router;
