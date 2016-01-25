var express = require('express');
var bodyParser = require('body-parser');

var app = express();

module.exports = function(stockRepository) {
	app.use(bodyParser.json());

	app.post('/stock', function(req, resp, next) {
		stockRepository.save(req.body.isbn, req.body.count)
			.then(function() { resp.send(req.body); })
			.catch(next);
	});

	app.get('/stock', function(req, resp, next) {
		return stockRepository.list()
			.then(function(books) { 
				resp.json(books);
			})
		.catch(next);
	});

	app.get('/stock/:isbn', function(req, resp, next) {
		return stockRepository.getCount(req.params.isbn)
			.then(function(count) {
				if(count === null) {
					resp.status(404).send();
				} else {
					resp.json({count: count});
				}
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

	return app;
};
