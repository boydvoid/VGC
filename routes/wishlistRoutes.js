const router = require('express').Router();
const wishlistController = require('../Controllers/wishlistController');

router
  .route('/create/wishlist')
  .post(wishlistController.create);

router
  .route('/wishlist/add')
  .post(wishlistController.add);

// removes an item from the games array
router
  .route('/wishlist/remove/game')
  .post(wishlistController.updateGames);

router
  .route('/wishlist/getGames')
  .get(wishlistController.getGames);

module.exports = router;
