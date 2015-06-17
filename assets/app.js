/* jshint devel: true */
'use strict';

var app = angular.module('postingsApp', []);

app.service('postingsSrv', function($http) {
	this.listPostings = function() {
		return $http.get('/api/postings');
	};

	this.addPosting = function(postingContent) {
		if (postingContent) {
			var newPosting = { username: 'Poster', content: postingContent };
			return $http.post('/api/postings', newPosting);
		}
		// TODO: consider what to return / how to build an empty promise obj
	};
});

app.controller('postingsCtrl', function($scope, postingsSrv) {

	postingsSrv.listPostings()
	.success(function(postings) {
		$scope.postings = (postings) ? postings : [];
	})
	.error(function(err) {
		console.log('error on listPostings(): ' + err);
	});

	$scope.addPosting = function() {
		if ($scope.postingContent) {
			postingsSrv.addPosting($scope.postingContent)
			.success(function(posting) {
				$scope.postings.unshift(posting);
				$scope.postingContent = null;
			});
		}
	};
});
