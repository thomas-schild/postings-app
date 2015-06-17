/* jshint devel: true */
'use strict';

var app = angular.module('postingsApp', []);

app.controller('postingsCtrl', function($scope, $http) {

	var listPostings = function() {
		$http.get('/api/postings')
		.success(function(postings) {
			$scope.postings = (postings) ? postings : [];
		})
		.error(function(err) {
			console.log('error on listPostings(): ' + err);
		});
	};

	var addPosting = function() {
		var postingContent = $scope.postingContent; 
		if (postingContent) {
			var newPosting = { username: 'Poster', content: postingContent };

			$http.post('/api/postings', newPosting)
			.success(function(posting) {
				$scope.postings.unshift(posting);
			});
		}
		$scope.postingContent = null;
	};

	$scope.listPostings = listPostings;
	$scope.addPosting = addPosting;

	listPostings();
});
