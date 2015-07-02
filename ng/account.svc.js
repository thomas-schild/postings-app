(function() {
	'use strict';

	angular.module('postingsApp').service('accountSvc', AccountSvc);

	// the accountSvc encapsulates the communication with the REST API regarding account management
	function AccountSvc($http) {

		var svc = this; // consider to use a factory instead: var svc = { ... }; return svc;

		svc.login = login;
		svc.getAccount = getAccount;
		svc.token = undefined; // will be set on successful login

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

			return $http.post('api/sessions', req).then( 
				createSessionOk,
				createSessionFailed
			);

			function createSessionOk(res) {
				console.log('... accountSvc.login received res: ', res);
					// get token out of response and store it within the service instance
					svc.token = res.data;
					return svc.getAccount();				
				}

			function createSessionFailed(err) {
					console.warn('... accountSvc.login failed, err: ', err);
					throw err.status + ':' + err.data;				
				}
		}

		function getAccount() {
			// return a promise, expected to contain the account
			console.log('accountSvc.getAccount is called...');

			var req = { headers: { 'x-jwt-token': svc.token } };

			console.log('... sending GET req to "api/accounts" ...');
			return $http.get('api/accounts', req).then( 
				getAccountOk,
				getAccountFailed
			);

			function getAccountOk(res) {
				console.log('... accountSvc.getAccount received res: ', res);
				return res.data;				
			}

			function getAccountFailed(err) {
				console.warn('... accountSvc.getAccount failed, err: ', err);
				throw err.status + ':' + err.data;
			}
		}
	}
})();