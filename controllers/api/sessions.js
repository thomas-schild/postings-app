/* jshint node:true */
'use strict';

var express = require('express');
var jwt = require('jwt-simple');
var bcrypt = require('bcrypt');
var Account = require('../../models/account');
var config = require('../../config');

var router = express.Router();

router.post('/', function(req, res, next) {
	console.log('req POST to "sessions"');

	var login = req.body.login;
	var password = req.body.password;
	delete req.body.password; // ensure password will not be compromitted by accident
	
	Account.findOne( { login: login } )
	.select('passwordHash')
	.exec(findCallback);

	var findCallback = function(err, account) {
		if (err) {
			return next(err);
		}
		validatePasswordForAccount(password, account, validationCallback);
	};

	var validationCallback = function(err, isValid) {
		if (err || !isValid) {
			res.status(401).send();
			console.log('... res: ' + res.statusMessage + ', err: ' + err.msg);
			return;
		}
		var token = jwt.encode(req.body, config.jwtSignSecret);
		req.send(token);
		console.log('... res: ' + res.statusMessage);
	};

});


module.exports = router;

function validatePasswordForAccount(password, account, callback) {
	if (! account) { 
		callback({ msg: 'failed to validate password for account, account is undefined' }, false); 
	} else 	if (! password) { 
		callback({ msg: 'failed to validate password for account, password is undefined' }, false); 
	} else {
		bcrypt.compare(password, account.passwordHash, callback);
	}
}
