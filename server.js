/* jslint node: true */
'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var statics = require('./controllers/static');
var postingsApi = require('./controllers/api/postings');

var portNr = 3001;

var app = express();
app.use(bodyParser.json());

app.use(statics);
app.use(postingsApi);

app.listen(portNr, function() {
	console.log('server started, listening on port ' + portNr + ', stop with Ctrl-C.');
});
