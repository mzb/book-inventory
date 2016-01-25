var request = require('supertest');
var assert = require('assert');
var app = require('../app');

describe('POST /stock', function() {
	it('echoes the request', function(done) {
		request(app)
			.post('/stock')
			.send({"isbn": "1234567890", "count": 10})
			.expect(200)
			.expect('Content-Type', /json/)
			.end(function(err, res) {
				if(err) return done(err);
				assert.equal(res.body.isbn, "1234567890");
				assert.equal(res.body.count, 10);
				done();
			});
	});
});
