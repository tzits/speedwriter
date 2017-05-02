/******************
 * MODULE IMPORTS *
 ******************/

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));



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

app.get('/about', function profilePage(req, res) {
	res.sendFile(__dirname + '/views/about.html');
});

/*
 * JSON API ENDPOINTS
 */


//server
app.listen(process.env.PORT || 8000, function() {
	console.log('Speedwriter Up and Running')
});