(function() {
	'use strict';

	angular.module('postingsApp')
	.controller('LoginCtrl', LoginCtrl);

	// the LoginCtrl is the view controller of the login.html page.
	// it uses the accountSvc, which itself calls the according REST services
	function LoginCtrl($scope, accountSvc) {
		console.log('LoginCtrl is called');

		$scope.login = login;

		function login(loginname, password) {
			accountSvc.login(loginname, password)
			.then( function(user) {
				console.log(user + ' logged in');
			});
		}
	}
})();