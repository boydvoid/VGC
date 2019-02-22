const router = require('express').Router();
const publicSellController = require('../Controllers/publicSellController');


router
  .route('/add/publicSell')
  .post(publicSellController.add);

router
  .route('/getPublicSell')
  .get(publicSellController.getPublicSell);

router
  .route('/public/sell/find/game/:id')
  .get(publicSellController.findGame);

router
  .route('/remove/public/sell')
  .post(publicSellController.remove);
module.exports = router;
