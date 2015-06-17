/* jslint node: true */
'use strict';

var router = require('express').Router();

router.get('/', function(req, res) {
	var opts = { 
		root: __dirname + '/..',
		dotfiles: 'deny'
	};

	res.sendFile('layouts/postings.html', opts, function(err) {
		if (err) {
			console.log(err);
			res.status(err.status).end();
		}
	});
});

module.exports = router;
