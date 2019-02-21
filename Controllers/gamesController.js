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
    db.games.find({
      gameID: req.body.id,
    }).then((game) => {
      if (game) {
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
      	}).then(() => {
          res.send(true);// game was added
        });
			 } // false for game wasnt added
      else {
        res.send(false);
      }
    });
  },
};
