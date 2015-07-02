(function() {
	'use strict';

	angular.module('postingsApp')
	.controller('AppCtrl', AppCtrl);

	function AppCtrl($scope) {

		$scope.$on('loginEvent', function (_, user) { // TODO: clarify what '_' is!
			$scope.currentUser = user;
		});
	}

})();