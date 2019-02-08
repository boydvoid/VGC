const axios = require("axios");
const router = require("express").Router();

router.get("/search/:id", (req, res) => {

	axios({
		url: "https://api-v3.igdb.com/search",
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'user-key': process.env.GAMESUSERKEY
		},
		data: `fields game.*; search "${req.params.id}";`
	})
		.then(response => {
			console.log(response.data);
		})
		.catch(err => {
			console.error(err);
		});

});

router.get("/games/cover", (req, res) => {
	axios({
		url: "https://api-v3.igdb.com/covers",
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'user-key': process.env.GAMESUSERKEY
		},
		data: `fields url; where id = ${req.params.id};`
	})
		.then(response => {
			console.log(response.data);
		})
		.catch(err => {
			console.error(err);
		});

});

module.exports = apiRouter;
