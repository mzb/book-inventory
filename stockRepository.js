var MongoClient = require('mongodb').MongoClient;
var mongoUrl = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/book_inventory';

var db = MongoClient.connect(mongoUrl).then(function(db) {
	return db.collection('books');
});

module.exports = function() {
	return {
		update: function(isbn, count) {
			return db.then(function(collection) { 
				collection.updateOne({isbn: isbn}, {isbn: isbn, count: count}, {upsert: true});
			});
		},

		list: function() {
			return db.then(function(collection) { 
				return collection.find({}).toArray();
			});
		},

		getCount: function(isbn) {
			return db.then(function(collection) {
				return collection.find({"isbn": isbn})
					.limit(1)
					.next()
					.then(function(book) {
						return book ? book.count : null;
					});
			});
		}
	};
};
