/* jslint node: true */
'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var Posting = require('./models/posting');

var portNr = 3001;

var app = express();

app.use(bodyParser.json());

app.get('/api/postings', function(req, res) {
	console.log('req GET to "api/postings"');
	var postings = [ {
		username: 'me',
		content: 'my first server posting'
	}];

	res.json(postings);
	console.log('... res: ' + res.statusMessage);
});

app.post('/api/postings', function(req, res, next) {
	console.log('req POST to "api/postings"');

	var posting = new Posting({
		username: req.body.username,
		content: req.body.content
	});

	posting.save(function(err, posting) {
		if (err) {
			return next(err);
		}
		res.status(201).json(posting);
		console.log('... res: ' + res.statusMessage);
	});
});

app.listen(portNr, function() {
	console.log('server started, listening on port ' + portNr + ', stop with Ctrl-C.');
});
