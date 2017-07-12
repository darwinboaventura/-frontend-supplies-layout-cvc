var gulp = require('gulp');
var sass = require('gulp-sass');
var copy = require('copy');
var connect = require('gulp-connect');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
	return gulp.src('src/sass/**/*.sass')
	.pipe(sass({
		outputStyle: 'compressed'
	}))
	.on('error', sass.logError)
	.pipe(
		autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
    	})
	)
	.pipe(gulp.dest('public/css'))
	.pipe(connect.reload());
});

gulp.task('html', function() {
	copy('src/html/**/*.html', 'public/', function(err, files) {
		if (err) throw err;
	});

	gulp.src('src/html/**/*.html').pipe(connect.reload());
});

gulp.task('js', function() {
	copy('src/js/**/*.js', 'public/js/', function(err, files) {
		if (err) throw err;
	});

	gulp.src('src/js/**/*.js').pipe(connect.reload());
});

gulp.task('connect', function() {
	connect.server({
		livereload: true,
		root: 'public'
	});
});

gulp.task('watch', function() {
	gulp.watch('src/html/**/*.html', ['html']);
	gulp.watch('src/js/**/*.js', ['js']);
	gulp.watch('src/sass/**/*.sass', ['sass']);
});

gulp.task('default', ['connect', 'watch']);