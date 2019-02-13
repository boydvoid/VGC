const db = require('../Models');
const passport = require('passport');
const saltRounds = 10;
const bcrypt = require('bcrypt');

module.exports = {
	checkLogin: (req, res) => {
		if (req.isAuthenticated()) {
			//send user id to client
			res.send(req.user)
		}
	},

	findById: function (req, res) {
		db.users.findOne({
			_id: req.params.id
		}).then(userInfo => {
			res.send(userInfo)
		})
	},
	updateData: (req, res) => {

		db.users.findOneAndUpdate({
			_id: req.user
		},
			req.body
		).then(data => {
			res.send(data)
		})
			.catch(err => {
				if (err) {
					console.log(err)
				}
			})
	},
	createUser: (req, res) => {

		req.checkBody('username', 'Username cannot be empty.').notEmpty();
		req.checkBody('email', 'Email field must not be empty.').notEmpty();
		req.checkBody('email', 'Email field must be and email.').isEmail();
		req.checkBody('password', 'Password must be 8 characters long.').len(8, 100);
		req.checkBody('passwordMatch', 'Password must be 8 characters long.').len(8, 100);
		req.checkBody('passwordMatch', 'Password must be 8 characters long.').equals(req.body.password);

		var errors = req.validationErrors();

		if (errors) {
			res.send(errors)

		} else {

			//hash the password
			var salt = bcrypt.genSaltSync(saltRounds);
			var hash = bcrypt.hashSync(req.body.password, salt);
			//bcrypt the password then insert

			db.users.create({
				username: req.body.username,
				email: req.body.email,
				password: hash,
				theme: 1,
				img: "https://github.com/robaboyd/VGC/blob/master/client/src/assets/defaultProfile.png?raw=true"

			})
				.then((created) => {
					req.login(created._id, (err) => {
						res.send(true)
					})
				})
				.catch(err => {
					//create user errors
					//either duplicate username or email
					if (err) {
						console.log(err.errmsg);
						let data = [err.errmsg];
						res.send(data)
					}
				})
		}
	}

};