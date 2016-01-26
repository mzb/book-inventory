var stockRepository = require('./stockRepository')();
var app = require('./app')(stockRepository);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server started at ' + port);
});
