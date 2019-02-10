const axios = require("axios");
const router = require("express").Router();
require('dotenv').config()
var express = require('express');
// Search games using inputted text.

router.get("/search/:id", (req, res) => {

	axios({
		url: "https://api-v3.igdb.com/games",
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'user-key': process.env.GAMESUSERKEY
		},
		data: `fields *; where id = ${req.params.id};`
	})
		.then(response => {
			console.log("Game search" + JSON.stringify(response.data));
			res.send(response.data);
		})
		.catch(err => {
			console.error(err);
		});

});

router.get('/popular', (req, res) => {
	axios({
		url: "https://api-v3.igdb.com/games/?fields=*&order=popularity:desc&limit=8",
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'user-key': process.env.GAMESUSERKEY
		},
		// data: `fields *; where platform = 48 ;`
	})
		.then(response => {
			res.send(response.data)
		})
		.catch(err => {
			console.error(err);
		});
})

// Get Cover for specific game ID.

router.get("/games/covers/:id", (req, res) => {
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
			res.send(response.data)
		})
		.catch(err => {
			console.error(err);
		});

});

// Get 10 latest covet arts.

// router.get("/games/covers/latest", (req, res) => {

// 	axios({
// 		url: "https://api-v3.igdb.com/covers",
// 		method: 'POST',
// 		headers: {
// 			'Accept': 'application/json',
// 			'user-key': process.env.GAMESUSERKEY
// 		},
// 		data: `fields url;`
// 	})
// 		.then(response => {
// 			console.log(response.data);
// 			res.send(response.data);
// 		})
// 		.catch(err => {
// 			console.error(err);
// 		});

// });



module.exports = router;

