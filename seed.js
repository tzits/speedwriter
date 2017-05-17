var db = require("./models");

var userList = [];
var docList = [];

userList.push({
	name: 'Toby',
	email: 'tzitsman@gmail.com',
	password: 'saxophone' 
})

userList.push({
	name: 'Jonah',
	email: 'jszitsman@gmail.com',
	password: 'penguin'
})

userList.push({
	name: 'Jeff',
	email: 'jzitsman@gmail.com',
	password: 'pinkbird'
})

docList.push({
	title: 'First Story',
	start_count: 1000,
	content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lobortis sollicitudin massa a efficitur. Maecenas sed egestas purus. Suspendisse posuere nisi in erat bibendum, id finibus ante egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc ac lacinia est. Aenean gravida purus justo, eu egestas turpis pharetra vel. Curabitur eget elementum nunc, quis volutpat tortor. Aenean ac lacus a velit vehicula porta. Nullam maximus a mi nec commodo. Aliquam erat volutpat. Nulla ut luctus ligula, id sollicitudin erat.',
	user: 'Toby'
})

docList.push({
	title: 'Second Story',
	start_count: 1200,
	content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lobortis sollicitudin massa a efficitur. Maecenas sed egestas purus. Suspendisse posuere nisi in erat bibendum, id finibus ante egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc ac lacinia est. Aenean gravida purus justo, eu egestas turpis pharetra vel. Curabitur eget elementum nunc, quis volutpat tortor. Aenean ac lacus a velit vehicula porta. Nullam maximus a mi nec commodo. Aliquam erat volutpat. Nulla ut luctus ligula, id sollicitudin erat.',
	user: 'Toby'
})

docList.push({
	title: 'Third Story',
	start_count: 1020,
	content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lobortis sollicitudin massa a efficitur. Maecenas sed egestas purus. Suspendisse posuere nisi in erat bibendum, id finibus ante egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc ac lacinia est. Aenean gravida purus justo, eu egestas turpis pharetra vel. Curabitur eget elementum nunc, quis volutpat tortor. Aenean ac lacus a velit vehicula porta. Nullam maximus a mi nec commodo. Aliquam erat volutpat. Nulla ut luctus ligula, id sollicitudin erat.',
	user: 'Toby'
})

db.User.remove({}, function(err, users){
	userList.forEach(function(userdata) {
		var user = new db.User(userdata)
		user.save(function(err, savedUser) {
			if (err) {console.log(err)}
		})
	})
})


db.Doc.remove({}, function(err, docs){
  docList.forEach(function (docData) { 	
    var doc = new db.Doc(docData)
    db.User.findOne({name: docData.user}, function (err, foundUser) {
      if (err) {
        console.log('we fucked up');
        return;
      }
      doc.user = foundUser;
      doc.save(function(err, savedDoc) {
	      if (err) {
	        return console.log(err);
	      } else {
	      	console.log(savedDoc)
	      }
      });
    });
  });
})