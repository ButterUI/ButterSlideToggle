var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var browserify = require("gulp-browserify");
var browserSync = require('browser-sync').create();

gulp.task('serve', ['scripts'], function() {

  browserSync.init({
    server: "./"
  });

  gulp.watch("./src/**/*.js", ['scripts']).on('change', browserSync.reload);
  gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task("scripts", function () {
  return gulp.src("src/js/butterSlideToggle.js")
    // .pipe(sourcemaps.init())
    .pipe(babel())
    // .pipe(browserify({
    //   debug : !gulp.env.production
    // }))
    .pipe(gulp.dest("dist/js"));
});