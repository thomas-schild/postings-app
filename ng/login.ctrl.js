(function() {
	'use strict';

	angular.module('postingsApp')
	.controller('LoginCtrl', LoginCtrl);

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