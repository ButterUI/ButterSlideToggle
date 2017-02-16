var gulp = require("gulp");
var sass = require('gulp-sass');
var sourcemaps = require("gulp-sourcemaps");
var autoprefixer = require('gulp-autoprefixer');
var babel = require("gulp-babel");
var browserify = require("gulp-browserify");
var browserSync = require('browser-sync').create();
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var inject = require('gulp-inject-string');

gulp.task('serve', ['scripts'], function() {

  browserSync.init({
    server: "./"
  });

  gulp.watch("./src/**/*.js", ['scripts']).on('change', browserSync.reload);
  gulp.watch("./src/**/*.scss", ['styles']).on('change', browserSync.reload);
  gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task("scripts", function () {
  return gulp.src("src/js/butterSlideToggle.js")
    // .pipe(sourcemaps.init())
    .pipe(babel())
    // .pipe(browserify({
    //   debug : !gulp.env.production
    // }))
    .pipe(inject.wrap(`(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], function (jQuery) {
            return (root.ButterSlideToggle = factory(jQuery));
        });
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        root.ButterSlideToggle = factory(root.jQuery);
    }
}(this, function ($) {
    //use jQuery in some fashion.

    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
`, `
return ButterSlideToggle;}));`))
    .pipe(gulp.dest("dist/js"));
});

gulp.task('styles', function() {
  gulp.src('src/scss/butterSlideToggle.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    // Catch any SCSS errors and prevent them from crashing gulp
    .on('error', function (error) {
      console.error(error);
      this.emit('end');
    })
    .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 9'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css/'))
    .pipe(cleanCss({
      compatibility: 'ie9'
    }))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('dist/css/'))
});