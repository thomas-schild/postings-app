(function() {
	'use strict';

	angular.module('postingsApp')
	.service('accountSvc', accountSvc);

	// the accountSvc encapsulates the communication with the REST API regarding account management
	function accountSvc($http) {

		var svc = this; // consider to use a factory instead: var svc = { ... }; return svc;

		svc.login = login;
		svc.getAccount = getAccount;

		function login(name, password) {
			console.log('accountSvc.login is called...');

			var reqData = { login: name, password: password };
			// $http-methods return promises, 
			// use promise.then( function(res) {}, function(err) {}, function (progess) {} ) to handle
			console.log('... sending POST req to "api/sessions" ...');
			$http.post('api/sessions', reqData)
			.then( function(res) {
				console.log('... accountSvc received res: ' + res);
				// attributes of the response object: res.status, res.statusText, res.headers, res.data, res.config
				// get token out of response and store it within the service instance
				svc.token = res.data;

				return getAccount();
			});
		}

		function getAccount() {

			console.log('accountSvc.getAccount is called, TODO: implement!');
		}
	}
})();