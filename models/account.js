/* jslint node:true */
'use strict';

var db = require('../db');

var Account = db.model('Account', {
	login: { type: String, required: true },
	passwordHash: { type: String, required: true, select: false }
});

module.exports = Account;
