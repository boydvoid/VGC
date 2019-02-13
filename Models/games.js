const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;

const gamesSchema = new Schema({
	ageRating: {type: String, required: true, unique: true},
	avgRatingScore: {type: number, required: true, unique: true},
	avgRatingSources: {type: number, required: true, unique: true},
	artworks: {type: String, required: true, unique: true},
	companies: {type: String, required: true, unique: true},
	cover: {type: String, required: true, unique: true},
	gameID: {type: number, required: true, unique: true},
	Genres: {type: String, required: true, unique: true},
	igdbURL: {type: String, required: true, unique: true},
	platform: {type: String, required: true, unique: true},
	releaseDate: {type: String, required: true, unique: true},
	screenshots: {type: String, required: true, unique: true},
	similarGames: {type: String, required: true, unique: true},
	summary: {type: String, required: true, unique: true},
	videos: {type: String, required: true, unique: true},
	websites: {type: String, required: true, unique: true},
});
