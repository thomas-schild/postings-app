/* jshint node: true */
'use strict';

var gulp = require('gulp');
var stylus = require('gulp-stylus');

gulp.task('buildCss', function() {
	return gulp.src('css/**/*.styl')
	.pipe(stylus())
	.pipe(gulp.dest('assets/css'));
});

gulp.task('watch:css', ['buildCss'], function() { 
	gulp.watch('css/**/*.styl', ['buildCss']);
});
