(function() {
	'use strict';

	angular.module('postingsApp')
	.service('accountSvc', accountSvc);

	function accountSvc($http) {

		var svc = this; // consider to use a factory instead: var svc = { ... }; return svc;

		svc.login = login;
		svc.getAccount = getAccount;

		function login(name, password) {
			console.log('login is called, TODO: implement!');
		}

		function getAccount() {
			console.log('getAccount is called, TODO: implement!');
		}
	}
})();