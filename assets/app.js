/* jshint devel: true */
'use strict';

var app = angular.module('postingsApp', []);

app.service('postingsSrv', function($http) {
	var listPostings = function() {
		return $http.get('/api/postings');
	};

	var addPosting = function(postingContent) {
		if (postingContent) {
			var newPosting = { username: 'Poster', content: postingContent };
			return $http.post('/api/postings', newPosting);
		}
		// TODO: consider what to return / how to build an empty promise obj
	};

	this.fetch = listPostings;
	this.create = addPosting;
});

app.controller('postingsCtrl', function($scope, postingsSrv) {

	var listPostings = function() {
		postingsSrv.fetch()
		.success(function(postings) {
			$scope.postings = (postings) ? postings : [];
		})
		.error(function(err) {
			console.log('error on listPostings(): ' + err);
		});
	};

	var addPosting = function() {
		postingsSrv.create($scope.postingContent)
		.success(function(posting) {
			$scope.postings.unshift(posting);
		});
		$scope.postingContent = null;
	};

	$scope.listPostings = listPostings;
	$scope.addPosting = addPosting;

	listPostings();
});
