var MongoClient = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://localhost:27017/book_inventory';

var db = MongoClient.connect(mongoUrl).then(function(db) {
	return db.collection('books');
});

function save(book) {
	return db.then(function(collection) { 
		collection.updateOne({isbn: book.isbn}, book, {upsert: true}); 
	});
}

function list() {
	return db.then(function(collection) { 
		return collection.find({}).toArray();
	});
}

function getCount(isbn) {
	return db.then(function(collection) {
		return collection.find({"isbn": isbn})
			.limit(1)
			.next()
			.then(function(book) {
				return book ? book.count : null;
			});
	});
}

module.exports = {
	save: save,
	list: list,
	getCount: getCount
};
