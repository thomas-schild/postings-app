/* jslint node: true */
'use strict';

var express = require('express');

var portNr = 3001;

var app = express();

app.get('/api/postings', function(req, resp) {
	var postings = [ {
		username: 'me',
		content: 'my first server posting'
	}];

	resp.json(postings);
});

app.listen(portNr, function() {
	console.log('server started, listening on port ' + portNr + ', stop with Ctrl-C.');
});
