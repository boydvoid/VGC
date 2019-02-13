const axios = require("axios");
const router = require("express").Router();
require('dotenv').config();
var express = require('express');


// Search games using inputted text.

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
});

// Get the game cover for a specific cover ID. This ID
// is returned from the info provided by the game info.

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

// Get all associated artwork for a specific artwork ID. These ID's
// are returned from the info provided by the game info.

router.get("/games/artwork/:id", (req, res) => {
	axios({
		url: "https://api-v3.igdb.com/artworks",
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

// Get the rating info for a specific rating ID. This ID
// is returned from the info provided by the game info.

router.get("/games/ageRating/:id", (req, res) => {
	axios({
		url: "https://api-v3.igdb.com/age_ratings",
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'user-key': process.env.GAMESUSERKEY
		},
		data: `fields *; where id = ${req.params.id};`
	})
		.then(response => {
			res.send(response.data)
		})
		.catch(err => {
			console.error(err);
		});

});


module.exports = router;

