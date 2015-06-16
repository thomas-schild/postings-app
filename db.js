/* jslint node: true */
'use strict';

var mongoose = require('mongoose');

var dbConnectionUrl = 'mongodb://localhost/postingsapp';
mongoose.connect(dbConnectionUrl, function() {
	console.log('connected to ' + dbConnectionUrl);
});

module.exports = mongoose;
