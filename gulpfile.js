var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');
var concat = require('gulp-concat');
var server = require('gulp-webserver');
var less = require('gulp-less');

var paths = {
	'js': ['app/**/*.js', '!app/app.js'],
	'less': ['app/less/**/*.less']
}

gulp.task('concat', function(done) {
	gulp.src(paths.js)
		.pipe(concat('app.js'))
		.pipe(gulp.dest('app'));
	done();
});

gulp.task('less', function(done) {
	gulp.src('app/less/app.less')
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
	gulp.watch(paths.js, ['concat']);
	gulp.watch(paths.less, ['less']);
	gulp.start('server');
});