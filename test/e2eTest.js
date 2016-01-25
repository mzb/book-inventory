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

describe('GET /stock', function() {
	it('lists all books in stock', function(done) {
		stockRepository.update("1234", 1);
		stockRepository.update("5678", 2);

		request(app)
			.get('/stock')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(function(err, res) {
				if(err) return done(err);
				assert.deepEqual(res.body, [{isbn: "1234", count: 1}, {isbn: "5678", count: 2}]);
				done();
			});
	});
});

describe('GET /stock/:isbn', function() {
	it('returns number of books by given ISBN', function(done) {
		stockRepository.update("1234", 1);

		request(app)
			.get('/stock/1234')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(function(err, res) {
				if(err) return done(err);
				assert.deepEqual(res.body, {count: 1});
				done();
			});
	});
});
