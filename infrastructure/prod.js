var heroin = require('heroin-js');
var _ = require('lodash');

var configurator = heroin(process.env.HEROKU_API_TOKEN, {debug: false});

configurator(_.merge({}, require('./base'), {
	name: 'mb-book-inventory',
	domains: ['mb-book-inventory.herokuapp.com'],
	config_vars: {
		NODE_ENV: 'production'
	}
}));
