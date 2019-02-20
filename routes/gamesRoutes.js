const router = require('express').Router();
const gamesController = require('../Controllers/gamesController');

router
	.route('/games/add')
	.post(gamesController.add);

module.exports = router;
