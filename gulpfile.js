(function() {
  'use strict';

  const gulp    = require('gulp');
  const concat  = require('gulp-concat');
  const connect = require('gulp-connect');
  const rename  = require('gulp-rename');
  const uglify  = require('gulp-uglify');

  gulp.task('watch', () => {
    gulp.watch('src/**/*.js', ['build']);
    gulp.watch('docs/index.html', connect.reload());
  });

  gulp.task('serve', () => {
    connect.server({
      root: 'docs',
      livereload: true
    });
  });

  gulp.task('build', () => {
    return gulp.src(['src/main.js', 'src/**/*.js'])
      .pipe(concat('ng-mdl.js'))
      .pipe(gulp.dest('dist'))
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('dist'))
      .pipe(gulp.dest('docs/js'))
      .pipe(connect.reload());
  });

  gulp.task('default', ['build', 'watch', 'serve']);
})();
