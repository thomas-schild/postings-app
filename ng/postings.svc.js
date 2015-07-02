(function() {
	'use strict';

	angular.module('postingsApp')
	.service('postingsSvc', postingsSvc);

	function postingsSvc($http) {

		var svc = this; // consider to use a factory instead: var svc = { ... }; return svc;

		svc.listPostings = listPostings;
		svc.addPosting = addPosting;

		function listPostings() {
				// Note: $http.get returns a promise, which itself gets returned for promise-chaining
			return $http.get('/api/postings');
		}

		function addPosting(postingContent) {
			if (postingContent) {
				var newPosting = { username: 'Poster', content: postingContent };
				// Note: $http.post returns a promise, which itself gets returned for promise-chaining
				return $http.post('/api/postings', newPosting); 
			}
		}
	}
})();