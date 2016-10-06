const gulp = require('gulp');
const gulpEjs = require('gulp-ejs');
const watch = require('gulp-watch');

let data = require('./data/data.json');

gulp.task('default', ["compile"], function () {
    return watch(['src/**/*.*', 'data/*.*'], function () {
        delete require.cache[require.resolve('./data/data.json')]
        data = require('./data/data.json');
        gulp.start('compile');
    });
});

gulp.task('compile', ["copy"], function () {
    return gulp.src('src/**/*.html')
            .pipe(gulpEjs(data))
            .pipe(gulp.dest('./build'));
});

gulp.task('copy', function () {
    return gulp.src('src/**/*.*')
            .pipe(gulp.dest('./build'));
});