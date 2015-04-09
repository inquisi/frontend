var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');
var concat = require('gulp-concat');
var server = require('gulp-webserver');
var less = require('gulp-less');
var order = require("gulp-order");

var paths = {
    'js': ['app/**/*.js', '!app/js/spec/**/*.js', '!app/app.js', '!app/js/lib/angular-mocks/*.js'],
    'less': ['app/styles/less/**/*.less']
}

gulp.task('concat', function(done) {
    gulp.src(paths.js)
        .pipe(order([
            "app/js/lib/**/*.js",
            "app/js/main.js",
            "app/js/modules/*/*.js",
            "app/js/**/*.js"
        ], {
            base: '.'
        }))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('app'));
    done();
});

gulp.task('less', function(done) {
    gulp.src('app/styles/less/app.less')
        .pipe(less({
            // paths: []
        }))
        .pipe(gulp.dest("app/"));
    done();
});

// gulp.task('uglify', function(done) {
// 	gulp.src('app/app.js')
// 		.pipe(uglify())
// 		.pipe(gulp.dest('app'));
// 	done();
// });

// gulp.task('build', ['concat', 'uglify']);

gulp.task('server', function() {
    gulp.src('app')
        .pipe(server({
            port: 8000,
            fallback: 'index.html'
        }));
});

gulp.task('default', function() {
    gulp.start('concat');
    gulp.start('less');
    gulp.watch(paths.js, ['concat']);
    gulp.watch(paths.less, ['less']);
    gulp.start('server');
});