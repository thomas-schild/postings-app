/* jslint node: true */
'use strict';
var express = require('express');
var router = express.Router();
var rootDir = __dirname + '/..';

router.use(express.static(rootDir + '/assets'));
router.use(express.static(rootDir + '/templates'));

router.get('/', function(req, res) {
	var opts = { 
		root: rootDir,
		dotfiles: 'deny'
	};

	res.sendFile('layouts/app.html', opts, function(err) {
		if (err) {
			console.log(err);
			res.status(err.status).end();
		}
	});
});

module.exports = router;
