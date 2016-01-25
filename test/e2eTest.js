var request = require('supertest');
var assert = require('assert');
var stockRepository = require('../inMemoryStockRepository')();
var app = require('../app')(stockRepository);

beforeEach(function() {
	stockRepository.clear();
});

describe('POST /stock', function() {
	it('stocks books', function(done) {
		var book = {"isbn": "1234567890", "count": 10};
		request(app)
			.post('/stock')
			.send(book)
			.expect(200)
			.expect('Content-Type', /json/)
			.end(function(err, res) {
				if(err) return done(err);
				assert.deepEqual(res.body, book);
				done();
			});
	});
});

