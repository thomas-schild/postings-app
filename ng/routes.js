(function() {
	'use strict';

	angular.module('postingsApp').config( function($routeProvider) { 
		$routeProvider
		.when('/', { controller: 'PostingsCtrl', templateUrl: 'postings.html' }) 
		.when('/register', { controller: 'RegisterCtrl', templateUrl: 'register.html' })
		.when('/login', { controller: 'LoginCtrl', templateUrl: 'login.html' });
	});
})();