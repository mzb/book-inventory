var express = require('express');
var bodyParser = require('body-parser');

var app = express();

module.exports = function(stockRepository) {
	app.use(bodyParser.json());

	var routes = require('./routes')(stockRepository);

	app.post('/stock', routes.add);

	app.get('/stock', routes.list);

	app.get('/stock/:isbn', routes.getCount);

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
