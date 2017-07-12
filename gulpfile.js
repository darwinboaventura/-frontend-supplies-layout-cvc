var gulp = require('gulp');
var sass = require('gulp-sass');
var copy = require('copy');
var connect = require('gulp-connect');
var autoprefixer = require('gulp-autoprefixer');
var svgSprite = require('gulp-svg-sprite');
var plumber = require('gulp-plumber');

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
	.pipe(gulp.dest('public/assets/css'))
	.pipe(connect.reload());
});

gulp.task('html', function() {
	copy('src/html/**/*.html', 'public/', function(err, files) {
		if (err) throw err;
	});

	gulp.src('src/html/**/*.html').pipe(connect.reload());
});

gulp.task('js', function() {
	copy('src/js/**/*.js', 'public/assets/js/', function(err, files) {
		if (err) throw err;
	});

	gulp.src('src/js/**/*.js').pipe(connect.reload());
});

gulp.task('svg', function() {
	gulp.src('src/svgs/**/*.svg')
	.pipe(plumber())
	.pipe(svgSprite({
		"log": "debug",
	    "shape": {
	        "dimension": {
	            "attributes": true
	        }
	    },
	    "mode": {
	        "symbol": {
	            "dest": "svg",
	            "sprite": "sprite.svg",
	            "bust": true
	        }
	    }
	}))
	.on('error', function(error){ console.log(error); })
	.pipe(gulp.dest('public/assets/'));
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
	gulp.watch('src/svgs/**/*.svg', ['svg']);
});

gulp.task('default', ['connect', 'watch']);