module.exports = { 
	region: 'eu',
	maintenance: false,
	stack: 'cedar-14',
	config_vars: { 
		MONGOLAB_URI: 'mongodb://heroku_rc6jxkln:jl60qp4df6khbm6tnh4j9139g6@ds035975.mongolab.com:35975/heroku_rc6jxkln',
	},
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
		log_drains: ['syslog://data.logentries.com:13636']
};
