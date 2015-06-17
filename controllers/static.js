/* jslint node: true */
'use strict';

var router = require('express').Router();

router.get('/', function(req, res) {
	res.sendfile('layouts/postings.html');
});

module.exports = router;
