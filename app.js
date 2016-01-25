var express = require('express');
var bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://localhost:27017/book_inventory';
var db = MongoClient.connect(mongoUrl).then(function(db) {
	return db.collection('books');
});

var app = express();

app.use(bodyParser.json());

app.post('/stock', function(req, resp) {
	var book = req.body;
	db.then(function(collection) { 
		collection.updateOne({isbn: book.isbn}, book, {upsert: true}); 
	})
	.then(function() { resp.send(book); });
});

app.get('/stock', function(req, resp, next) {
	return db.then(function(collection) { 
		return collection.find({}).toArray();
	})
	.then(function(books) { 
		resp.json(books);
	})
	.catch(next);
});

app.use(function(err, req, resp, next) {
	resp.status(err.status || 500);
	resp.json({
		message: err.message,
		error: 'production' === process.env.NODE_ENV ? {} : err
	});
});

app.use(function(req, resp, next) {
	var err = new Error('Not found');
	err.status = 404;
	next(err);
});

module.exports = app;
