(function() {
	'use strict';

	angular.module('postingsApp')
	.controller('LoginCtrl', LoginCtrl);

	// the LoginCtrl is the view controller of the login.html page.
	// it uses the accountSvc, which itself calls the according REST services
	function LoginCtrl($scope, accountSvc) {

		$scope.login = login;

		function login(loginname, password) {
			console.log('LoginCtrl.login ...');
			var promise = accountSvc.login(loginname, password);
			console.log('... got promise from accountSvc: ', promise);
			promise.then( 
				function(user) {
					console.log('... %s logged in', user.login);
				}, 
				function(err) {
					console.warn('... error on login: ', err);
				}
			);
		}
	}
})();