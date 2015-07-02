(function() {
	'use strict';

	angular.module('postingsApp')
	.controller('PostingsCtrl', PostingsCtrl);

	function PostingsCtrl($scope, postingsSvc) {

		postingsSvc.listPostings()
		.success(function(postings) {
			$scope.postings = (postings) ? postings : [];
		})
		.error(function(err) {
			console.warn('error on listPostings(): ', err);
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

		// Note on sourcemaps: sourcemaps ar fine to map e.g. log output to the right source file
		// but Chrome/Safari can not link to the source when there is an err on js-execution 
		// console.error('dummy err just to introduce sourcemaps'); // <= log links to right source file
		// console.noFunct('fail for sourcemap') // <= err in js-execution, no mapping to this source  file

	}

})();