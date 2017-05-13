
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
app.use('/vendor', express.static(__dirname + '/bower_components'));
var controllers = require('./controllers');

var db = require('./models');

/**********
 * ROUTES *
 **********/

/*
 * HTML ENDPOINTS
 */
app.get('/', function homepage(req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

// app.get('/about', function profilePage(req, res) {
// 	res.sendFile(__dirname + '/views/about.html');
// });

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