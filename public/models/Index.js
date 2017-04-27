var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/speedwriter")

var Doc = require('./Docs');
var User = require('./Users');

module.exports.Doc = Doc;
module.exports.User = User;