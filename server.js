
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

//Passport
var passport = require('passport');
LocalStrategy = require('passport-local').Strategy;
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

// passport/login.js
passport.use('login', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) { 
    // check in mongo if a user with username exists or not
    User.findOne({ 'username' :  username }, 
      function(err, user) {
        // In case of any error, return using the done method
        if (err)
          return done(err);
        // Username does not exist, log error & redirect back
        if (!user){
          console.log('User Not Found with username '+username);
          return done(null, false, 
                req.flash('message', 'User Not found.'));                 
        }
        // User exists but wrong password, log the error 
        if (!isValidPassword(user, password)){
          console.log('Invalid Password');
          return done(null, false, 
              req.flash('message', 'Invalid Password'));
        }
        // User and password both match, return user from 
        // done method which will be treated like success
        return done(null, user);
      }
    );
}));

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

// Create User
app.post('/api/users', controllers.users.createUser)

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