const axios = require("axios");
const router = require("express").Router();
const collectionController = require('../Controllers/collectionController');

router
  .route('/create/collection')
  .post(collectionController.create);
  
router
  .route('/add')
  .post(collectionController.add);

//removes an item from the games array
router
  .route('/remove/game')
  .post(collectionController.updateGames);
  
router 
  .route(`/getGames`)
  .get(collectionController.getGames);

module.exports = router;
