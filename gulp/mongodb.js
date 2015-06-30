/* jshint node: true */
'use strict';

var gulp = require('gulp');
var exec = require('child_process').exec;

// start or stop  mongodb, see: http://stackoverflow.com/a/28048696/46810
gulp.task('dev:mongodb-start', runCommand('mongod --dbpath /usr/local/data/mongodb'));
gulp.task('dev:mongodb-stop',  runCommand('mongo --eval "use admin; db.shutdownServer();"'));

function runCommand(command) {
  return function (cb) {
    exec(command, function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
  };
}
