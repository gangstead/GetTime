var https = require('https');
var winston = require('winston');
var fs = require('fs');

//Set up logging
var logger = new(winston.Logger)({
	transports: [
		new(winston.transports.Console)({
			colorize: true
		}),
		new(winston.transports.File)({ //file transport seems to be broken
			filename: __dirname + '/GetTime.log',
			//level:'debug',
			colorize:true,
			timestamp:true,
			maxsize:1000000,
			maxFiles:2
		})
	]
});

//Read parameters
if (!process.argv[2]) {
	logger.error("Usage: node GetTime.js <config>.json ");
	process.exit(1);
}
var config = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));

//Initialize stats
var stats = {
	count: 0,
	average: 0,
	shortest: 0,
	longest: 0,
	errors: 0,
	last: 0
};

function time1(param) {
	var options = {
		host: config.host,
		port: config.port || 443,
		path: config.path + param,
		headers: config.headers || ''
	};
	var start = Date.now()
	https.get(options, function(res) {
		var duration = Date.now() - start;
		updateStats(duration);
		logger.debug('Success in ' + duration + 'ms');
		// Buffer the body entirely for processing as a whole.
		var bodyChunks = [];
		res.on('data', function(chunk) {
			// You can process streamed parts here...
			bodyChunks.push(chunk);
		}).on('end', function() {
			var body = Buffer.concat(bodyChunks);
			logger.debug(body);
		});

		timeNext();
	}).on('error', function(e) {
		var duration = Date.now() - start;
		stats.errors++;
		logger.error('Error for paramater ' + param + ' after ' + duration + 'ms:' + e.message);
		timeNext();
	});
};

function updateStats(duration) {
	if (duration < stats.shortest || stats.shortest == 0) stats.shortest = duration;
	if (duration > stats.longest || stats.longest == 0) stats.longest = duration;
	stats.average = (duration + stats.average * stats.count) / (stats.count + 1);
	stats.count++;
	stats.last = duration;
	logger.info(stats);
};

function timeNext() {
	var next = config.params.pop();
	if (next) time1(next);
	else {
		logger.info('Completed all requests');
		logger.info('Final Stats:');
		logger.info(stats);
		process.exit(0);
	}
}

//Main function
timeNext();