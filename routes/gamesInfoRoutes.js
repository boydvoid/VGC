const router = require('express').Router();
const gamesInfoController = require('../Controllers/gamesInfoController');

router
  .route('/add')
  .post(gamesInfoController.add);

// removes an item from the games array
router
  .route('/getGames')
  .get(gamesInfoController.getGames);

module.exports = router;
