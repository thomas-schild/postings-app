/* jshint node: true */
'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');

// gulp.task('default', ['sayHello'], function() {
// 	console.log('running default task');
// });

// gulp.task('sayHello', function() {
// 	console.log('Hello Gulp!');
// });

gulp.task('buildJs', function() {
	gulp.src(['ng/module.js', 'ng/**/*.js'])
	.pipe(concat('app.js'))
	.pipe(gulp.dest('assets'));
});
