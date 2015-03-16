var gulp = require('gulp');
var gulpWebpack = require('gulp-webpack');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');

var webpack = require('webpack');

var dest = 'dist/';
var isWatching = false;

gulp.task('styles', function() {
  return gulp.src('./app/styles/app.scss')
   .pipe(plumber())
   .pipe(sass())
   .pipe(autoprefixer())
   .pipe(gulp.dest(dest));
});

gulp.task('assets', function() {
  return gulp.src('public/**/*.*')
    .pipe(gulp.dest(dest));
});

gulp.task('bowerAssets', function() {
  return gulp.src(['bower_components/bootstrap-sass/assets/fonts/**/*.*'])
    .pipe(gulp.dest(dest + 'fonts/'));
});

gulp.task('webpack', function() {
  return gulp.src('app/app.js')
    .pipe(gulpWebpack({
      watch: isWatching,
      entry: {
        app: './app/App.jsx'
      },
      output: {
        filename: '[name].js'
      },
      module: {
        loaders: [
          { test: /\.js(x)?$/, loader: 'jsx-loader?harmony' }
        ]
      },
      resolve: {
        extensions: ['', '.js', '.jsx']
      },
      plugins: [new webpack.optimize.DedupePlugin()]
    }))
    .pipe(gulp.dest(dest));
});

gulp.task('setWatch', function() {
  isWatching = true;
});

gulp.task('watch', function(cb) {
  gulp.watch('public/**/*.*', ['assets']);
  gulp.watch('app/styles/**/*.scss', ['styles']);
  cb();
});

gulp.task('build', ['assets', 'bowerAssets', 'styles', 'webpack']);

gulp.task('default', ['setWatch', 'build', 'watch']);
