var db = require('../models');

function show(req, res) {
	var docId = req.params.id;
	db.Doc.findById(docId, function(err, doc) {
		if (err) { throw err; };
		res.json(doc);
	});
}

function index(req, res) {
	var userId = req.params.id;
	db.Doc.find({user_id: userId}, function(err, docs) {
		if (err) { throw err; };
		res.json(docs);
	});
}

function createDoc(req, res) {
	console.log(req.body.owner, "hello")
	db.User.find({id: req.params.id}, function(err,user) {
		if (user == false) {
			console.log('hell no');
			res.send('No');
		} else {
				console.log(user)
				var ourUser = user[0]._id
				var newDoc = req.body;
				newDoc.user = ourUser;
				db.Doc.create(newDoc, function(err, doc) {
				if (err) { console.log('so close');}
				res.json(doc);
				doc.save()
			})

		}
	})
}

function updateDoc(req, res) {
	var updatedDoc = req.body;
	var docId = req.params.id;
	console.log("docId found: " + docId);
	db.Doc.findOneAndUpdate({_id: docId}, updatedDoc, {new: true}, function(err,foundDoc) {
		if (err) {throw err};
		console.log(foundDoc);
		foundDoc.save();
		res.json(foundDoc);
	});
}

module.exports = {
	show: show,
	index: index,
	createDoc: createDoc,
	updateDoc: updateDoc
}