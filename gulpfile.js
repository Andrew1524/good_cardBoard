var gulp = require('gulp');
var bs = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));



// Запускаем сервер, предварительно сеомпилировав SASS
gulp.task('serve', function(done) {

	bs.init({
		 server: "./src"
	});

	gulp.watch("src/sass/*.sass", gulp.series('sass'));
	gulp.watch("src/*.html").on('change', () => {
		bs.reload();
		done();
});
done();
});

// Делаем компиляцию SASS в CSS
gulp.task('sass', function(done) {
	gulp.src("src/sass/*.sass")
		 .pipe(sass())
		 .pipe(gulp.dest("src/css"))
		 .pipe(bs.stream());

done();
});

gulp.task('default', gulp.series('sass', 'serve'));