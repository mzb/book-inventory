var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

app.post('/stock', function(req, resp) {
	resp.send(req.body);
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
