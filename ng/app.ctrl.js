(function() {
	'use strict';

	angular.module('postingsApp').controller('AppCtrl', AppCtrl);

	function AppCtrl($scope) {

		$scope.$on('loginEvent', function (_, user) { 
			console.log('received event "_": ', _);
			$scope.currentUser = user;
		});
	}

})();