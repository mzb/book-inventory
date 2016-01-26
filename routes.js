module.exports = function(stockRepository) {
	return {
		update: function(req, resp, next) {
			var book = req.body;
			stockRepository.update(book.isbn, book.count)
				.then(function() { resp.json(book); })
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
					resp.format({
						html: function() {
							if(count === null) {
								resp.status(404).send();
							} else {
								resp.send(count + "");
							}
						},
						json: function() {
							if(count === null) {
								resp.status(404).json();
							} else {
								resp.json({count: count});
							}
						},
						'default': function() {
							resp.sendStatus(415);
						}
					});
				})
			.catch(next);
		}
	};
};
