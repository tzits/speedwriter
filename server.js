
/******************
 * MODULE IMPORTS *
 ******************/

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.static(__dirname));


var controllers = require('./controllers');

var db = require('./models');
var User = db.User

//Passport
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(function(user, done) {
  done(null, user._id);
});
 
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

/**********
 * ROUTES *
 **********/

/*
 * HTML ENDPOINTS
 */
app.get('/', function homepage(req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

app.get('/about', function profilePage(req, res) {
	res.sendFile(__dirname + '/views/about.html');
});

app.get('/users/*', function profilePage(req, res) {
  res.sendFile(__dirname + '/views/users.html');
});

/*
 * JSON API ENDPOINTS
 */

app.post('/api/word', controllers.docs.word)
 // Get One Doc
app.get('/api/docs/:id', controllers.docs.show)

// Get All User's Doc
app.get('/api/users/:id/docs', controllers.docs.index)

// // Get One User
app.get('/api/users/:id', controllers.users.getUser)


app.get('/api/docs', controllers.docs.getalldocs)
// Create User
app.post('/api/users', controllers.users.createUser)

// Login
app.post('/login', controllers.users.login)

// Create Document
app.post('/api/docs', controllers.docs.createDoc)

// Update User
app.patch('/api/users/:id', controllers.users.updateUser)

// Update Document
app.patch('/api/docs/:id', controllers.docs.updateDoc)

// Delete Doc
app.delete('/api/docs/:id', controllers.docs.deleteDoc)

//server
app.listen(process.env.PORT || 8000, function() {
	console.log('Speedwriter Up and Running')
});