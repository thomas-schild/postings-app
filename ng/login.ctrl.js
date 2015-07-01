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
			console.log('... got promise from accountSvc: ');
			console.log(promise);
			promise.then( 
				function(user) {
					console.log('... ' + user.login + ' logged in');
					console.log(user);
				}, 
				function(err) {
					console.log('... error on login: ');
					console.log(user);
				}
			);
		}
	}
})();