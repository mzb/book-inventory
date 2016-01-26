var heroin = require('heroin-js');

var configurator = heroin(process.env.HEROKU_API_TOKEN, {debug: false});

configurator.export('mb-book-inventory').then(function(result) {
	console.log(result);
});

configurator(
		{ 
			name: 'mb-book-inventory',
			region: 'eu',
			maintenance: false,
			stack: 'cedar-14',
			config_vars: { 
				MONGOLAB_URI: 'mongodb://heroku_ckzf5zlg:47rkkd6eqnpheur1kkd9oec202@ds047935.mongolab.com:47935/heroku_ckzf5zlg',
				FOO: 'bar'
			},
			addons: { mongolab: { plan: 'mongolab:sandbox' } },
			collaborators: [ 
				'mateusz.buczek@plan3.se',
				'plan3-labs@herokumanager.com',
				'woj.niemiec@gmail.com',
				'joanna.turban@schibsted.pl' ],
			features:
			{ 'runtime-dyno-metadata': { enabled: false },
				'log-runtime-metrics': { enabled: false },
				'http-session-affinity': { enabled: false },
				preboot: { enabled: false },
				'http-shard-header': { enabled: false },
				'http-end-to-end-continue': { enabled: false } },
			formation: [ { process: 'web', quantity: 1, size: 'Free' } ],
			log_drains: [],
			domains: [ 'mb-book-inventory.herokuapp.com' ]
		}
);
