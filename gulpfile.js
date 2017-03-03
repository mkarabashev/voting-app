// this code sets up the back-end automated testing
'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util') ;
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');
const del = require('del');

gulp.task('lint', () =>
  gulp.src([ 'server/**/*.js', 'server/**/*.jsx', 'src/**/*.js', 'src**/*.jsx' ])
    .pipe(eslint({ fix: true }))
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
);

gulp.task('clean', () =>
  del([ 'tests'])
);;

gulp.task('transpile', [ 'clean' ], () =>
  gulp.src([ 'server/**/*.js', 'server/**/*.jsx' ])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('tests'))
);

gulp.task('pre-test', [ 'lint', 'transpile' ], () =>
  gulp.src([
    'tests/**/*.js',
    'tests/**/*.jsx',
    '!tests/**/*.test.js',
    '!tests/**/index.js',
    '!tests/test.config.js',
    '!tests/models/utils.js'
  ])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
);

gulp.task('test:server', [ 'pre-test' ], () =>
  gulp.src(
    [ 'tests/test.config.js', 'tests/**/*.test.js' ],
    { read: false }
  )
    .pipe(mocha({ reporter: 'spec' }))
    .pipe(istanbul.writeReports())
    .on('error', gutil.log)
);

gulp.task('watch', [ 'test:server' ], () =>
  gulp.watch([ 'server/**/*.js' ], [ 'test:server' ])
);
