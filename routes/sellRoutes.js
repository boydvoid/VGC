const axios = require("axios");
const router = require("express").Router();
const sellController = require('../Controllers/sellController');

router
	.route('/create/sell')
	.post(sellController.create);

router
	.route('/add/sell')
	.post(sellController.add);

//removes an item from the games array
router
	.route('/remove/sell')
	.post(sellController.updateSell);

router
	.route(`/getSell`)
	.get(sellController.getSell);

module.exports = router;
