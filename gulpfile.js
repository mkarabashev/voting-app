// this code sets up the back-end automated testing
'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util') ;
const eslint = require('gulp-eslint');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');

gulp.task('lint', () =>
  gulp.src([ 'server/**/*.js', 'server/**/*.jsx', 'src/**/*.js', 'src**/*.jsx' ])
    .pipe(eslint({ fix: true }))
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
);

gulp.task('pre-test', [ 'lint' ], () =>
  gulp.src([ 'server/**/*.js', '!server/**/*.test.js', '!server/*.js' ])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
);

gulp.task('test:server', [ 'pre-test' ], () =>
  gulp.src(
    [ './config/test.config.js', 'server/**/*.test.js' ],
    { read: false }
  )
    .pipe(mocha({ reporter: 'spec' }))
    .pipe(istanbul.writeReports())
    .on('error', gutil.log)
);

gulp.task('test:server_watch', [ 'lint' ], () =>
  gulp.src(
    [ './config/test.config.js', 'server/**/*.test.js' ],
    { read: false }
  )
    .pipe(mocha({ reporter: 'spec' }))
    .on('error', gutil.log)
)

gulp.task('watch', [ 'test:server' ], () =>
  gulp.watch([ 'server/**/*.js' ], [ 'test:server_watch' ])
);
