const db = require('../Models');

module.exports = {

	add: (req, res) => {

		let gamesID = [];

		db.games.find().then(function (count) {

			for (let j = 0; j < count.length; j++) {

				gamesID.push(count[j].gameID)

			}

			console.log(gamesID);

			for (let i = 0; i < req.body.length; i++) {

				if (gamesID.indexOf(req.body[i].id) > -1) {

					console.log(`${req.body[i].id} Already Exists in DB.`)

				} else {

					db.games.create({
						// avgRating: req.user,
						// avgRatingSources: req.body.name,
						// artworks: req.body.url,
						// companies: req.body.index,
						// cover: req.body.index,
						gameID: req.body[i].id,
						// Genres: req.body.index,
						// igdbURL: req.body.index,
						// platform: req.body.index,
						// releaseDate: req.body.index,
						// screenshots: req.body.index,
						// series: req.body.index,
						// summary: req.body.index,
						// videos: req.body.index,
						// websites: req.body.index,
					})
				}
			}

		});

	}
};