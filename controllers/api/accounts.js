/* jshint node:true */
'use strict';

var express = require('express');
var jwt = require('jwt-simple');
var bcrypt = require('bcrypt');
var Account = require('../../models/account');
var config = require('../../config');

var router = express.Router();

router.get('/', function(req, res, next) {
	console.log('req GET to "accounts"');

	var token = req.headers['x-jwt-token'];
	if (!token) {
		return res.send(401);
	}
	var tokenPayload = jwt.decode(token, config.jwtSignSecret);

	Account.findOne({ login: tokenPayload.login }, findCallback);

	var findCallback = function(err, account) {
		if (err) {
			return next(err);
		}
		res.json(account);
		console.log('... res: ' + res.statusMessage); 
	};

});

router.post('/', function(req, res, next) {
	console.log('req POST to "accounts"');

	var login = req.body.login;
	var password = req.body.password;
	delete req.body.password; // ensure password will not be compromitted by accident

	var passwordHash = bcrypt.hashSync(password, 8);

	var account = new Account( { login: login, passwordHash: passwordHash } );
	console.log('...gonna persist: ' + account);

	account.save( function(err, savedAccount) {
		if (err) {
			return next(err);
		}
		var resAccount = { login: savedAccount.login }; // return only a reduced sight, TODO: check how to filter passwdHash on db side		
		res.status(201).location('/accounts/' + resAccount.login).json(resAccount);
		console.log('... res: ' + res.statusMessage); 	
	});
});

module.exports = router;
