var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./Users');

var DocSchema = new Schema({
	title: String,
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	start_count: Number,
	content: String,
	user_id: Number
})

var Doc = mongoose.model('Doc', DocSchema)

module.exports = Doc