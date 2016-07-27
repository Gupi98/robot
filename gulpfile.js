// Gulp Libraries

var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var coffee = require('gulp-coffee');
var jade = require('gulp-jade');
var webserver = require('gulp-webserver');

// Error Handling

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

// Sources Paths

var paths = {
  sass: ['./src/scss/**/*.scss', './src/sass/**/*.sass'],
  jade: ['./src/jade/**/*.jade']
};

// Gulp Default Task

gulp.task('default', ['sass', 'jade', 'watch', 'webserver']);

// Gulp Sass Task

gulp.task('sass', function(done) {
  gutil.log(gutil.colors.yellow('Processing SASS File...'));
  gulp.src('./src/sass/app.sass')
    .pipe(sass({
      errLogToConsole: true
    })
    .on('error', handleError))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

// Gulp Jade Task

gulp.task('jade', function(done) {
  var YOUR_LOCALS = {};
  
  gutil.log(gutil.colors.yellow('Processing JADE File...'));

  gulp.src(paths.jade)
    .pipe(jade({
      locals: YOUR_LOCALS
    })
    .on('error', handleError))
    .pipe(gulp.dest('./www/'))
    .on('end', done);
});


gulp.task('watch', function() {
  gutil.log(gutil.colors.yellow('Starting WATCH task...'));
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.jade, ['jade']);
});

// Web Server

gulp.task('webserver', function() {
  gutil.log(gutil.colors.yellow('WebServer is starting. Thanks for looking at me :)'));
  gulp.src('./www')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: false,
      host: 'localhost',
      port: 7391
    }));
});