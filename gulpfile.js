'use strict';

const gulp = require('gulp');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');
const gutil = require('gulp-util') ;

let task = {};

gulp.task('lint', () =>
  gulp.src([ '**/*.js', '**/*.jsx' '!node_modules/**' ])
    .pipe(eslint({ fix: true }))
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
);

gulp.task('mocha', task.mocha = () =>
  gulp.src(
    [ './config/test.config.js', '**/*.test.js', '!node_modules/**' ],
    { read: false }
  )
    .pipe(mocha({ reporter: 'spec' }))
    .on('error', gutil.log)
);

gulp.task('mocha:lint', [ 'lint' ], task.mocha);

gulp.task('watch', [ 'mocha:lint' ], () =>
  gulp.watch([ '**/*.js', '!node_modules/**' ], [ 'mocha:lint' ])
);
