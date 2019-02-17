
const db = require('../Models');
//we need passport for req.user easy way to get user id 
const passport = require('passport');

module.exports = {
	add: (req, res) => {
		console.log(req.body[0])
		db.publicSell.create({
			userID: req.user,
			gameID: req.body.id,
			name: req.body.name,
			url: req.body.url,
			gameIndex: req.body.index
		}).then(data => {
			res.send(data)
		})
	},
	getPublicSell: (req, res) => {
		db.publicSell.find({
		}).then(data => {
			console.log(data)
			res.send(data);
		})
	}
}