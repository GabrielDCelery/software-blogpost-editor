var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var connect = require('gulp-connect');

gulp.task('connect', function() {
	connect.server({
		port: 8888,
		livereload: true
	});
});

gulp.task('html', function(){
	gulp.src('*.html')
		.pipe(connect.reload());
})

gulp.task('js', function(){
	gulp.src('js/*.js')
		.pipe(connect.reload());
});

gulp.task('sass', function(){
	return sass('scss/*.scss')
    .on('error', sass.logError)
    .pipe(gulp.dest('css'))
    .pipe(connect.reload());
});

gulp.task('watch', function(){
	gulp.watch(['*.html'], ['html']);
	gulp.watch(['js/*.js'], ['js']);
	gulp.watch('scss/*.scss', ['sass']);
});

gulp.task('default', ['connect', 'sass', 'watch']);