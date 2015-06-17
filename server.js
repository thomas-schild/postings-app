/* jslint node: true */
'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var postingsApi = require('./controllers/api/postings');

var portNr = 3001;

var app = express();
app.use(bodyParser.json());

app.use(postingsApi);

app.get('/', function(req, res) {
	res.sendfile('layouts/postings.html');
});

app.listen(portNr, function() {
	console.log('server started, listening on port ' + portNr + ', stop with Ctrl-C.');
});
