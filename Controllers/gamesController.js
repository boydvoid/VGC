const db = require('../Models');

module.exports = {

	gameID: (req, res) => {
		db.games.findOne({
			gameID: req.params.id,
		}).then((game) => {
			res.send(game);
		});
	},


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
						gameName: req.body.name,
						avgRating: req.body.averageRating,
						avgRatingSources: req.body.averageRatingSources,
						companies: req.body.companies,
						cover: req.body.imgUrl,
						gameID: req.body.id,
						gameModes: req.body.gameModes,
						genres: req.body.genres,
						videos: req.body.videos,
						igdbURL: req.body.igdbLink,
						platform: req.body.platform,
						releaseDate: req.body.releaseDate,
						screenshots: req.body.screenshots,
						series: req.body.series,
						summary: req.body.summary,
						websites: req.body.websites,
					})
				}
			}

		});

	}
};

