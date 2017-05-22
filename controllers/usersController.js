var db = require('../models');
var mongoose = require('mongoose');
var User = mongoose.model('User');


function getUser(req, res) {
	var userId = req.params.id;
	db.User.findById(userId, function(err, user) {
		if (err) { throw err; };
		res.json(user);
	});
}

function createUser(req, res) {
	var newUser = new User();
	newUser.name = req.body.name;
	newUser.email = req.body.email;
	newUser.setPassword(req.body.password);

	db.User.create(newUser, function(err, user) {
		if (err) 
			{ console.log('nice try',err) 
		} else {
			console.log(user,'created');
			res.json(user);
		}
	});
}

function updateUser(req, res) {
	var updatedUser = req.body;
	var userId = req.params.id;
	console.log("userId found: " + userId);
	db.Doc.findOneAndUpdate({_id: userId}, updatedUser, {new: true}, function(err,foundUser) {
		if (err) {throw err};
		console.log(foundUser);
		foundUser.save();
		res.json(foundUser);
	});
}

module.exports = {
	getUser: getUser,
	createUser: createUser,
	updateUser: updateUser
}