var db = require('../models');
var mongoose = require('mongoose');
mongoose.connect(dbConfig.url)
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
	done(null, user._id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

passport.use('login', new LocalStrategy({
	passReqToCallback : true
},
function(req, username, password, done) {
	User.findOne({'username' : username},
		function(err, user) {
			if(err)
				return done(err);
			if(!user){
				console.log('User Nof Found with username '+username);
				return done(null, false,
					req.flash('message', 'User not Found'))
			}
			if (!isValidPassword(user, password)) {
				console.log('Invalid Password');
				return done(null, false,
					req.flash('message','Invalid Password'))
			}
			return done(null, user);
		}
	);
}))

function getUser(req, res) {
	var userId = req.params.id;
	db.User.findById(userId, function(err, user) {
		if (err) { throw err; };
		res.json(user);
	});
}

function createUser(req, res) {
	db.User.create(req.body, function(err, user) {
		if (err) { console.log('nice try') };
		console.log('it worked');
		res.json(user);
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