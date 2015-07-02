(function() {
	'use strict';

	angular.module('postingsApp').config( function($routeProvider) { 
		$routeProvider
		.when('/',         { controller: 'PostingsCtrl', controllerAs: 'vm', templateUrl: 'postings.html' })
		.when('/register', { controller: 'RegisterCtrl', controllerAs: 'vm', templateUrl: 'register.html' })
		.when('/login',    { controller: 'LoginCtrl',    controllerAs: 'vm', templateUrl: 'login.html' });
	});
})();