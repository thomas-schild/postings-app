(function() {
	'use strict';

	angular.module('postingsApp').controller('PostingsCtrl', PostingsCtrl);

	PostingsCtrl.$inject = ['postingsSvc'];

	function PostingsCtrl(postingsSvc) {

		var vm = this;
		vm.newPostingContent = null; // filled by user input
		vm.postings = []; // filled by activate()
		vm.addPosting = addPosting;

		activate();

		function activate() {
			console.log('in PostingsCtrl.activate');
			vm.newPostingContent = null;

			return postingsSvc.listPostings().then(
				getPostingsOk,
				getPostingsFailed
			);

			function getPostingsOk(postings) {
				console.log('got postings');
				vm.postings = (postings) ? postings : [];
				return vm.postings;
			}

			function getPostingsFailed(err) {
				console.warn('error on listPostings(): ', err);
			}
		}

		function addPosting() {
			console.log('in PostingsCtrl.addPosting');
			if (vm.newPostingContent) {
				postingsSvc.createPosting(vm.newPostingContent).then(
					createPostingOk,
					createPostingFailed
				);
			}

			function createPostingOk(newPosting) {
				console.log('created posting: ', newPosting);					
				vm.postings.unshift(newPosting);
				vm.newPostingContent = null;
			}

			function createPostingFailed(err) {
				console.warn('error on createPosting(): ', err);					
			}
		}

		// Note on sourcemaps: sourcemaps ar fine to map e.g. log output to the right source file
		// but Chrome/Safari can not link to the source when there is an err on js-execution 
		//console.error('dummy err just to introduce sourcemaps'); // <= log links to right source file
		//console.noFunct('fail for sourcemap') // <= err in js-execution, no mapping to this source  file

	}

})();