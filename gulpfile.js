/** gulp tasks for watch and build js and sass files */
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var sass = require('gulp-sass');
var paths = require('./gulppath');
var config = require('./config');

/** WATCH TASKS */
/** put all *.scss files in one min.css file */
gulp.task('watch-styles', function() {
  gulp.src(paths.front.src.sass)
    .pipe(concat('styles.min.css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(minifycss())
    .pipe(gulp.dest(paths.front.dest.sass))
    .pipe(browserSync.stream());
});

/** default taks */
gulp.task('default', function() {
  console.log('aca');
  browserSync.init({
    port: config.port,
    server: './public'
  });

  /** watch for sass changes */
  gulp.watch(paths.front.src.sass, ['watch-styles']);

  /** watch for html changes to reload browsers */
  gulp.watch('public/**/*.html').on('change', browserSync.reload);
});
