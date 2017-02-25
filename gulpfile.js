// this code sets up the back-end automated testing
'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util') ;
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');

gulp.task('lint', () =>
  gulp.src([ 'server/**/*.js', 'server/**/*.jsx', 'src/**/*.js', 'src**/*.jsx' ])
    .pipe(eslint({ fix: true }))
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
);

gulp.task('transpile', () =>
  gulp.src([ 'server/**/*.js', 'server/**/*.jsx' ])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/tests'))
);

gulp.task('pre-test', [ 'lint', 'transpile' ], () =>
  gulp.src([ 'dist/tests/**/*.js', 'dist/tests/**/*.jsx', '!dist/tests/**/*.test.js' ])
    .pipe(istanbul({
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire())
);

gulp.task('test:server', [ 'pre-test' ], () =>
  gulp.src(
    [ './config/test.config.js', 'dist/tests/**/*.test.js' ],
    { read: false }
  )
    .pipe(mocha({ reporter: 'spec' }))
    .pipe(istanbul.writeReports())
    .on('error', gutil.log)
);

gulp.task('test:server_watch', [ 'lint', 'transpile' ], () =>
  gulp.src(
    [ './config/test.config.js', 'dist/tests/**/*.test.js' ],
    { read: false }
  )
    .pipe(mocha({ reporter: 'spec' }))
    .on('error', gutil.log)
)

gulp.task('watch', [ 'test:server' ], () =>
  gulp.watch([ 'server/**/*.js' ], [ 'test:server_watch' ])
);
