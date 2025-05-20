const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssBeautify = require('gulp-cssbeautify');

// Paths
const paths = {
  sass: './sass/**/*.scss',
  css: './css',
};

// Compile Sass and beautify CSS
gulp.task('sass', function () {
  return gulp
    .src(paths.sass)
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError)) // Compile Sass
    .pipe(postcss([autoprefixer()])) // Add vendor prefixes
    .pipe(cssBeautify({ // Beautify CSS with line breaks
      indent: '  ', // Use two spaces for indentation
      openbrace: 'end-of-line', // Places `{` at the end of the selector line
      autosemicolon: true // Automatically adds semicolons
    }))
    .pipe(gulp.dest(paths.css)); // Output CSS
});

// Default task
gulp.task('default', gulp.series('sass'));
