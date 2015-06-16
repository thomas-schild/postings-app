/* jslint node: true */
'use strict';

var db = require('../db');

var Posting = db.model('Posting', {
	username: { type: String, required: true },
	content:  { type: String, required: true },
	date:     { type: Date,   required: true, default: Date.now }
});

module.exports  = Posting;
