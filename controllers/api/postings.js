/* jslint node: true */
'use strict';

var express = require('express');
var Posting = require('../../models/posting');

var router = express.Router();

router.get('/', function(req, res, next) {
	console.log('req GET to "api/postings"');

	Posting.find().sort('-date').exec(function(err, postings) {
		if (err) {
			return next(err);
		}
		res.json(postings);
		console.log('... res: ' + res.statusMessage);
	});
});

router.post('/', function(req, res, next) {
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

module.exports = router;
