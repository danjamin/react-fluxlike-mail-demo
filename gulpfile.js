var gulp = require('gulp')
var gulpWebpack = require('gulp-webpack')

var webpack = require('webpack')
var autoprefixer = require('autoprefixer-core')

var dest = 'dist/'
var isWatching = false

gulp.task('assets', function() {
  return gulp.src('public/**/*.*')
    .pipe(gulp.dest(dest))
})

gulp.task('webpack', function() {
  return gulp.src('app/app.js')
    .pipe(gulpWebpack({
      watch: isWatching,
      entry: {
        app: './app/App.react.js'
      },
      output: {
        filename: "[name].js"
      },
      module: {
        loaders: [
          { test: /\.css$/, loader: "style-loader!css-loader!postcss-loader" },
          { test: /\.js$/, loader: 'jsx-loader?harmony' }
        ]
      },
      postcss: [autoprefixer({browsers: ['last 2 versions']})],
      resolve: {
        extensions: ['', '.js']
      },
      plugins: [new webpack.optimize.DedupePlugin()]
    }))
    .pipe(gulp.dest(dest))
})

gulp.task('setWatch', function() {
  isWatching = true
})

gulp.task('watch', function() {
  return gulp.watch('public/**/*.*', ['assets'])
})

gulp.task('build', ['assets', 'webpack'])

gulp.task('default', ['setWatch', 'build', 'watch'])
