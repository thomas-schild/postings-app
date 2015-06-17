/* jslint node: true */
'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var portNr = 3001;

var app = express();
app.use(bodyParser.json());

app.use('/', 			 require('./controllers/static'));
app.use('/api/postings', require('./controllers/api/postings'));

app.listen(portNr, function() {
	console.log('server started, listening on port ' + portNr + ', stop with Ctrl-C.');
});
