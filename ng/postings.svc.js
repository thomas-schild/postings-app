(function() {
	'use strict';

	angular.module('postingsApp').service('postingsSvc', PostingsSvc);

	PostingsSvc.$inject = ['$http'];

	function PostingsSvc($http) {

		var svc = this; // consider to use a factory instead: var svc = { ... }; return svc;

		svc.listPostings = listPostings;
		svc.createPosting = createPosting;

		function listPostings() {
			return $http.get('/api/postings').then(
				getPostingsOk,
				getPostingsFailed
			);

			function getPostingsOk(res) {
				var postings = res.data;
				return postings;
			}

			function getPostingsFailed(err) {
				console.warn('error when calling "GET api/postings": ', err);
			}			
		}

		function createPosting(postingContent) {
			if (postingContent) {
				var newPosting = { username: 'Poster', content: postingContent };
				return $http.post('/api/postings', newPosting).then(
					createPostingOk,
					createPostingFailed
				);
			}

			function createPostingOk(res) {
				var postingCreated = res.data;
				return postingCreated;
			}

			function createPostingFailed(err) {
				console.warn('error when calling "POST api/postings": ', err);
			}			
		}
	}
})();