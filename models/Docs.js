var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./Users');

var DocSchema = new Schema({
	title: String,
	user: String,
	start_count: Number,
	content: String
})

var Doc = mongoose.model('Doc', DocSchema)

module.exports = Doc