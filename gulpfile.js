/* jshint node: true */
'use strict';

var gulp = require('gulp');
var fs = require('fs');

// gulpfile is splitted into separated gulp files in subdir './gulp', which are put together like this:
fs.readdirSync(__dirname + '/gulp').forEach( function(file) {
	console.log('gulpfile: ' + file);
	require('./gulp/' + file);
} );

gulp.task('dev', ['dev:server', 'watch:js', 'watch:css']);
