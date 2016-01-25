var express = require('express');
var app = express();

app.use(function(req, resp, next) {
	console.log('Got request');
	next();
});

app.use(function(req, resp, next) {
	console.log('Got request 2!');
	next();
});

app.get('/', function(req, resp, next) {
	console.log('Route-specific middleware');
	next();
}, function(req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
