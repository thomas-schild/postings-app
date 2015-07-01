(function() {
	'use strict';

	angular.module('postingsApp')
	.service('accountSvc', accountSvc);

	// the accountSvc encapsulates the communication with the REST API regarding account management
	function accountSvc($http, $q) {

		var svc = this; // consider to use a factory instead: var svc = { ... }; return svc;

		svc.login = login;
		svc.getAccount = getAccount;

		function login(name, password) {
			console.log('accountSvc.login is called...');

			var req = { login: name, password: password };
			console.log('... sending POST req to "api/sessions" ...');
			// $http-methods return promises, 
			// use promise.then( function(res) {}, function(err) {}, function (progess) {} ) to handle
			var deffered = $q.defer();
			$http.post('api/sessions', req).then( 
				function(res) {
					console.log('... accountSvc.login received res: ' + res);
					// attributes of the response object: res.status, res.statusText, res.headers, res.data, res.config
					// get token out of response and store it within the service instance
					svc.token = res.data;
					// return svc.getAccount();
					deffered.resolve(svc.getAccount());
				}, 
				function(err) {
					console.log('... accountSvc.login failed, err: ' + err);
					console.log(err);
					// throw err.status + ':' + err.data;
					deffered.reject(err);
				}
			);
			return deffered.promise;
		}

		function getAccount() {
			console.log('accountSvc.getAccount is called...');

			var req = { headers: { 'x-jwt-token': svc.token } };

			console.log('... sending GET req to "api/accounts" ...');
			var deffered = $q.defer();
			$http.get('api/accounts', req).then( 
				// return promise containing the account
				// see: http://chariotsolutions.com/blog/post/angularjs-corner-using-promises-q-handle-asynchronous-calls/
				function(res) {
					console.log('... accountSvc.getAccount received res: ' + res);
					console.log(res);
					// return res.data;
					deffered.resolve(res.data);
				},
				function(err) {
					console.log('... accountSvc.getAccount failed, err: ' + err);
					console.log(err);
					deffered.reject(err.status + ':' + err.data);
					// throw err.status + ':' + err.data;
				}
			);
			return deffered.promise;
		}
	}
})();