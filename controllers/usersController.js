var db = require('../models');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var expressJWT = require('express-jwt')
var jwt = require('jsonwebtoken');
var secret = require('../secret.js').secret



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
			var token = user.generateJwt();
			res.status(200);
			res.json({
				"token": token
			});
		}
	});
}

function login(req,res) {
	User.findOne({email: req.body.email}, function(err, user) {
		console.log(req.body)
		if (user == null) {
			res.json('fail')
		} else { 
			if (user.validPassword(req.body.password)) {
				var id = user._id
				console.log(id)
				res.json(id)
			} else {
				res.json('fail')
			}
			// var token = jwt.sign({ username: req.body.email }, secret)
			// res.status(200).json(token)
			// console.log('token:',token)
		};
	})
};

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
	updateUser: updateUser,
	login: login
}