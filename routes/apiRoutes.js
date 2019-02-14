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

// Get game info for a specific Game ID.

router.get("/games/:id", (req, res) => {
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
			res.send(response.data)
		})
		.catch(err => {
			console.error(err);
		});

});

// Get the game cover for a specific cover ID. This ID
// is returned from the info provided by the Search API call.

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
// are returned from the info provided by the Search API call.

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
// is returned from the info provided by the Search API call.

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

// Get the relate date for a specific release ID. This ID
// is returned from the info provided by the Search API call.

router.get("/games/releaseDate/:id", (req, res) => {
	axios({
		url: "https://api-v3.igdb.com/release_dates",
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

// Get the genre for a specific genre ID. This ID
// is returned from the info provided by the Search API call.

router.get("/games/genre/:id", (req, res) => {
	axios({
		url: "https://api-v3.igdb.com/genres",
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

// Get the company role for a specific company ID. This ID
// is returned from the info provided by the Search API call.

router.get("/games/companyRole/:id", (req, res) => {
	axios({
		url: "https://api-v3.igdb.com/involved_companies",
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

// Get the company name for a specific company ID. This ID
// is returned from the info provided by the Company Role API call.

router.get("/games/companyName/:id", (req, res) => {
	axios({
		url: "https://api-v3.igdb.com/companies",
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

// Get a game scrrenshot for a specific screenshot ID. This ID
// is returned from the info provided by the Search API call.

router.get("/games/screenshots/:id", (req, res) => {
	axios({
		url: "https://api-v3.igdb.com/screenshots",
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

// Get a game series for a specific series ID. This ID
// is returned from the info provided by the Search API call.

router.get("/games/series/:id", (req, res) => {
	axios({
		url: "https://api-v3.igdb.com/collections",
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

// Get a platform for a specific platform ID. This ID
// is returned from the info provided by the Search API call.

router.get("/games/platform/:id", (req, res) => {
	axios({
		url: "https://api-v3.igdb.com/platforms",
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

// Get a video for a specific video ID. This ID
// is returned from the info provided by the Search API call.
// video_id is for youtube (https://www.youtube.com/watch?v=)

router.get("/games/video/:id", (req, res) => {
	axios({
		url: "https://api-v3.igdb.com/game_videos",
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

// Get a website for a specific website ID. This ID
// is returned from the info provided by the Search API call.

router.get("/games/website/:id", (req, res) => {
	axios({
		url: "https://api-v3.igdb.com/websites",
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
