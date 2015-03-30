var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');
var concat = require('gulp-concat');
var server = require('gulp-webserver');

var paths = {
	'js': ['app/**/*.js', '!app/app.js']
}

gulp.task('concat', function(done) {
	gulp.src(paths.js)
		.pipe(concat('app.js'))
		.pipe(gulp.dest('app'));
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
			port: 8000
		}));

});

gulp.task('default', function() {
	gulp.watch(paths.js, ['concat']);
	gulp.start('server');
});