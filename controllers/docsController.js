var db = require('../models');
var builder = require('docx-builder');

function show(req, res) {
	var docId = req.params.id;
	db.Doc.findById(docId, function(err, doc) {
		if (err) { throw err; };
		res.json(doc);
	});
}

function index(req, res) {
	console.log(req.params,'1')
	var userId = req.params.id;

	db.Doc.find({"user": userId}, function(err, docs) {
		if (err) { console.log(err); } else {console.log(docs)};
		res.json(docs);
	});
}

function createDoc(req, res) {
	var newDoc = req.body
	db.Doc.create(newDoc, function(err, doc) {
		if (err) { console.log('so close', err);}
		else {
			res.json(doc);
			doc.save()
		}
	})

}


function updateDoc(req, res) {
	console.log(req.body)
	var updatedDoc = req.body;
	var docId = req.params.id;
	console.log("docId found: " + docId);
	db.Doc.findOneAndUpdate({_id: docId}, updatedDoc, {new: true}, function(err,foundDoc) {
		if (err) {throw err};
		console.log(foundDoc);
		foundDoc.save();
		console.log('i did it!!!!!!')
		res.json(foundDoc);
	});
}

function deleteDoc(req,res) {
	console.log('hi')
	console.log(req.params)
	var docId  = req.params.id;
	db.Doc.findByIdAndRemove(docId, function(err,foundDoc){
		if (err) {console.log(err)};
		res.json(foundDoc + " deleted")
	});
}

function word(req,res) {
	console.log('This is', req.body.title)
	var docx = new builder.Document();
	docx.beginHeader();
	docx.insertText(req.body.title);
	docx.endHeader();
	docx.insertText(req.body.content)
	console.log(docx)
	var title = req.body.title.replace(/\s/g, '')
	docx.save(__dirname + title + ".docx", function(err) {
		if(err) {console.log(err)}
		else {console.log('no error?')}
	})
}

function getalldocs(req,res) {
	db.Doc.find({}, function(err,docs) {
		if (err) {console.log('nope')}
		res.json(docs)
	})
}


module.exports = {
	show: show,
	index: index,
	createDoc: createDoc,
	updateDoc: updateDoc,
	deleteDoc: deleteDoc,
	word: word,
	getalldocs: getalldocs
}