(function() {
	'use strict';

	angular.module('postingsApp', []);
})();
(function() {
	'use strict';

	angular.module('postingsApp')
	.controller('postingsCtrl', PostingsCtrl);

	function PostingsCtrl($scope, postingsSvc) {

		postingsSvc.listPostings()
		.success(function(postings) {
			$scope.postings = (postings) ? postings : [];
		})
		.error(function(err) {
			console.log('error on listPostings(): ' + err);
		});

		$scope.addPosting = function() {
			if ($scope.postingContent) {
				postingsSvc.addPosting($scope.postingContent)
				.success(function(posting) {
					$scope.postings.unshift(posting);
					$scope.postingContent = null;
				});
			}
		};
	}
	
})();
(function() {
	'use strict';

	angular.module('postingsApp')
	.service('postingsSvc', postingsSvc);

	function postingsSvc($http) {

		var svc = this; // consider to use a factory instead: var svc = { ... }; return svc;

		svc.listPostings = listPostings;
		svc.addPosting = addPosting;

		function listPostings() {
			return $http.get('/api/postings');
		}

		function addPosting(postingContent) {
			if (postingContent) {
				var newPosting = { username: 'Poster', content: postingContent };
				return $http.post('/api/postings', newPosting);
			}
		// TODO: consider what to return / how to build an empty promise obj
		}
	}
})();