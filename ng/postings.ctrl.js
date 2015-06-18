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

		// console.err('dummy err just to introduce sourcemaps');
	}

})();