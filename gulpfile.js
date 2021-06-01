const gulp = require('gulp');
const requireDir = require('require-dir');

requireDir('./gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
sass.compiler = require('node-sass');
gulp.task('sass', function () {
   return gulp.src('./sass/**/*.scss')
   .pipe(concat('custom.scss'))
   .pipe(sass().on('error', sass.logError))
   .pipe(gulp.dest('./dist/'));
});
/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
|  Compile
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
gulp.task('compile', gulp.parallel('style', 'script', 'script:webpack', 'vendor'));
gulp.task('compile:all', gulp.parallel('compile', 'pug'));

/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
|  Deploy
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
gulp.task('build', gulp.series('clean:build', 'build:static', 'compile:all'));
gulp.task('build:test', gulp.series('build', 'watch'));
gulp.task('live', gulp.series('clean:live', 'build', 'build:push'));

/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
|  Run development environment
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
gulp.task('default', gulp.series('clean', 'compile', 'watch'));
var gulp = require('gulp');
var sass = require('gulp-sass');
var chmod = require('gulp-chmod');

gulp.task('sass', function () {
  return gulp.src('./demo/app/scss/**/*.scss')
    .pipe(chmod(0o755))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./dist/demo/css'));
});


gulp.task('sass:watch', function () {
  gulp.watch('./demo/app/scss/**/*.scss', ['sass']);
});