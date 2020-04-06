// ******** File Management Dependencies ********
var fs = require('fs');
var path = require('path');
var del = require('del');
// ******** Task Runner Dependencies ********
var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var merge = require('merge-stream');
var browserSync = require('browser-sync').create();
// ******** Post Processing Dependencies ********
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');
var concat = require('gulp-concat');
// ******** Path Definitions ********
var SOURCE_PATH = './src';
var BUILD_PATH = './build';

// ******** Core Task Running Functions ********
// Builds and Watches Files
gulp.task('serve', function(callback) {
  gulpSequence('build', serve)(callback)
});

// Runs a Single Project Build
gulp.task('build', function(callback) {
  gulpSequence('clean-build', 'process-html', 'copy-slides', 'process-css', 'process-js', 'clean-duplicate-files', browserSync.reload)(callback)
});
gulp.task('process-html', processHTML);
gulp.task('process-css', processCSS);
gulp.task('process-js', processJS);
gulp.task('copy-slides', copySlides);
gulp.task('clean-build', cleanBuild);
gulp.task('clean-duplicate-files', cleanDuplicateFiles);

function serve(callback) {
  initBrowserSync();
  gulp.watch(SOURCE_PATH + '/**/*', ['build'], browserSync.reload);
}

function processHTML() {
  return gulp.src('src/**/*.html', {}, '.html')
    .pipe(gulp.dest('build'))
};

function processCSS() {
  // Convert all sass to css, then concat
  // Get all slides
  var slides = getFolders(BUILD_PATH);
  // Set a src and dest for each folder
  slides = slides.map(function(folder) {
    return {
      src: path.join(BUILD_PATH, 'presentation', folder, '**/*.scss'),
      dest: path.join(BUILD_PATH, 'presentation', folder, 'style')
    }
  })
  // Build our array of streams that we will merge
  var tasks = slides.map(function(path) {
    return gulp.src(path.src)
      .pipe(sass().on('error', sass.logError))
      .pipe(concatCss('bundle.css'))
      .pipe(gulp.dest(path.dest));
  })
  // Return one large stream gulp needs for sync
  return merge(tasks);
}

function processJS() {
  // Bundle JS
  // Get all slides
  var slides = getFolders(BUILD_PATH);
  // Set a src and dest for each folder
  slides = slides.map(function(folder) {
    return {
      src: path.join(BUILD_PATH, 'presentation', folder, '**/*.js'),
      dest: path.join(BUILD_PATH, 'presentation', folder, 'js')
    }
  })
  // Build our array of streams that we will merge
  var tasks = slides.map(function(path) {
    return gulp.src(path.src)
      .pipe(concat('bundle.js'))
      .pipe(gulp.dest(path.dest));
  })
  // Return one large stream gulp needs for sync
  return merge(tasks);
}

function cleanBuild() {
  // Clean the build folder
  return del([BUILD_PATH]);
}

function cleanDuplicateFiles() {
  // Clean extraneous scss and css files
  return del([SHARED_PATH + '/**/*.css', BUILD_PATH + '/**/*.scss', BUILD_PATH + '/**/*.js', '!' + BUILD_PATH + '/**/bundle.js', BUILD_PATH + '/**/*.hogan', BUILD_PATH + '/**/templates'])
}

function copySlides() {
  // Copy our slide asssets into the build folder
  return gulp.src(SOURCE_PATH + '/**/*', {
      base: SOURCE_PATH
    })
    .pipe(gulp.dest(BUILD_PATH))
}

function initBrowserSync() {
  browserSync.init({
    server: {
      baseDir: BUILD_PATH
    },
    open: false // Change it to true if you wish to allow Browsersync to open a browser window
  });
}

function getFolders(dir) {
  // Get a list of the folders in a given directory
  return fs.readdirSync(dir)
    .filter(function(file) {
      return fs.statSync(path.join(dir, file)).isDirectory();
    });
}
