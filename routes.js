module.exports = function(stockRepository) {
	return {
		add: function(req, resp, next) {
			stockRepository.save(req.body.isbn, req.body.count)
				.then(function() { resp.send(req.body); })
				.catch(next);
		},
		list: function(req, resp, next) {
			return stockRepository.list()
				.then(function(books) { 
					resp.json(books);
				})
			.catch(next);
		},
		getCount: function(req, resp, next) {
			return stockRepository.getCount(req.params.isbn)
				.then(function(count) {
					if(count === null) {
						resp.status(404).send();
					} else {
						resp.json({count: count});
					}
				})
			.catch(next);
		}
	};
};
