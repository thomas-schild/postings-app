/* jshint node: true */
'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');

// gulp.task('default', ['sayHello'], function() {
// 	console.log('running default task');
// });

// gulp.task('sayHello', function() {
// 	console.log('Hello Gulp!');
// });

gulp.task('buildJs', function() {
	gulp.src(['ng/module.js', 'ng/**/*.js'])
	.pipe(concat('app.js'))
	.pipe(ngAnnotate()) // order matters! ngAnnotate must set $injects BEFORE minification with uglify
	.pipe(uglify())
	.pipe(gulp.dest('assets'));
});
