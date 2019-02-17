const router = require("express").Router();
const publicSellController = require('../Controllers/publicSellController');


router
	.route('/add/publicSell')
	.post(publicSellController.add);

router
	.route('/getPublicSell')
	.get(publicSellController.getPublicSell);

module.exports = router;
