/**
 * Created by ron on 3/25/17.
 */
var gulp       = require('gulp'),
  sass         = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cleanCss     = require('gulp-clean-css'),
  concat       = require('gulp-concat'),
  open         = require('gulp-open'),
  connect      = require('gulp-connect');

gulp.task('bundle', function () {
  return gulp.src('./script.js')
    .pipe(connect.reload());
});

gulp.task('scss', function() {
  return gulp.src('./stylesheets/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./stylesheets'))
    .pipe(connect.reload());
});

gulp.task('html', function() {
  gulp.src('./')
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  });
});

gulp.task('watch', function() {
  gulp.watch('./**/*.scss', ['scss']);
  gulp.watch('./*.html', ['html']);
  gulp.watch(['./**/*.js', '!./node_modules'], ['bundle']);
});

gulp.task('open', function(){
  gulp.src(__filename)
    .pipe(open({uri: 'http://localhost:8080'}));
});

gulp.task('init', ['bundle', 'scss', 'html', 'connect', 'watch']);