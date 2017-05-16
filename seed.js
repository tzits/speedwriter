var db = require("./models");

var docList = [];
var userList = [];

docList.push({
	title: 'First Story',
	start_count: 1000,
	content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lobortis sollicitudin massa a efficitur. Maecenas sed egestas purus. Suspendisse posuere nisi in erat bibendum, id finibus ante egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc ac lacinia est. Aenean gravida purus justo, eu egestas turpis pharetra vel. Curabitur eget elementum nunc, quis volutpat tortor. Aenean ac lacus a velit vehicula porta. Nullam maximus a mi nec commodo. Aliquam erat volutpat. Nulla ut luctus ligula, id sollicitudin erat.',
})

docList.push({
	title: 'Second Story',
	start_count: 1200,
	content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lobortis sollicitudin massa a efficitur. Maecenas sed egestas purus. Suspendisse posuere nisi in erat bibendum, id finibus ante egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc ac lacinia est. Aenean gravida purus justo, eu egestas turpis pharetra vel. Curabitur eget elementum nunc, quis volutpat tortor. Aenean ac lacus a velit vehicula porta. Nullam maximus a mi nec commodo. Aliquam erat volutpat. Nulla ut luctus ligula, id sollicitudin erat.',
})

docList.push({
	title: 'Third Story',
	start_count: 1020,
	content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lobortis sollicitudin massa a efficitur. Maecenas sed egestas purus. Suspendisse posuere nisi in erat bibendum, id finibus ante egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc ac lacinia est. Aenean gravida purus justo, eu egestas turpis pharetra vel. Curabitur eget elementum nunc, quis volutpat tortor. Aenean ac lacus a velit vehicula porta. Nullam maximus a mi nec commodo. Aliquam erat volutpat. Nulla ut luctus ligula, id sollicitudin erat.',
})

db.Doc.remove({}, function(err, pets){
  docList.forEach(function (docData) {
    var doc = new db.Doc(docData)
    doc.save(function(err, savedPet) {
      if (err) {
        return console.log(err);
      }
    });
  });
});