var _ = require('lodash');

module.exports = function() {
	var books = [];

	function findByIsbn(isbn) {
		return _.find(books, function(book) {
			return book.isbn === isbn;
		});
	}

	return {
		list: function() {
			return Promise.resolve(books);
		},

		update: function(isbn, count) {
			var item = findByIsbn(isbn);
			if (item) {
				item.count = count;
			} else {
				books.push({isbn: isbn, count: count});
			}
			return Promise.resolve();
		},

		getCount: function(isbn) {
			var item = findByIsbn(isbn);
			if (item) {
				return Promise.resolve(item.count);
			} else {
				return Promise.resolve(null);
			}
		},

		clear: function() {
			books = [];
		}
	};
};
