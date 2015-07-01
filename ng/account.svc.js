(function() {
	'use strict';

	angular.module('postingsApp')
	.service('accountSvc', accountSvc);

	// the accountSvc encapsulates the communication with the REST API regarding account management
	function accountSvc($http, $q) {

		var svc = this; // consider to use a factory instead: var svc = { ... }; return svc;

		svc.login = login;
		svc.getAccount = getAccount;

		// Important Note: both service methods are returning/using promises
		// Regarding promisies, see: 
		//     http://chariotsolutions.com/blog/post/angularjs-corner-using-promises-q-handle-asynchronous-calls/
		// Note, that the $http methods themself already return promises.
		// A http result object has these attributes: res.status, res.statusText, res.headers, res.data, res.config
		// Use promise.then( function(res) {}, function(err) {} ).fianlly(); to handle promises.

		function login(name, password) {
			console.log('accountSvc.login is called...');

			var req = { login: name, password: password };
			console.log('... sending POST req to "api/sessions" ...');

			// var deffered = $q.defer();
			return $http.post('api/sessions', req).then( 
				function(res) {
					console.log('... accountSvc.login received res: ' + res);
					// get token out of response and store it within the service instance
					svc.token = res.data;
					return svc.getAccount();
					// deffered.resolve(svc.getAccount());
				}, 
				function(err) {
					console.log('... accountSvc.login failed, err: ' + err);
					console.log(err);
					throw err.status + ':' + err.data;
					// deffered.reject(err);
				}
			);
			// return deffered.promise;
		}

		function getAccount() {
			// return a promise, expected to contain the account
			console.log('accountSvc.getAccount is called...');

			var req = { headers: { 'x-jwt-token': svc.token } };

			console.log('... sending GET req to "api/accounts" ...');
			// var deffered = $q.defer();
			return $http.get('api/accounts', req).then( 
				// return promise, expected to contain the account
				function(res) {
					console.log('... accountSvc.getAccount received res: ' + res);
					console.log(res);
					return res.data;
					// deffered.resolve(res.data);
				},
				function(err) {
					console.log('... accountSvc.getAccount failed, err: ' + err);
					console.log(err);
					// deffered.reject(err.status + ':' + err.data );
					throw err.status + ':' + err.data;
				}
			);
			// return deffered.promise;
		}
	}
})();