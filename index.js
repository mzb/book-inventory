var http = require('http');

http.createServer(function(req, resp) {
	resp.end('Hello');
}).listen(3000, function() {
	console.log('Server started...');
});


