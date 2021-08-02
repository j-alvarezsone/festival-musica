const { series, src, dest, watch } = require('gulp');
const gulpSass = require('gulp-sass');
const dartSass = require('dart-sass');

const sass = gulpSass(dartSass);

const paths = {
  imagenes: 'src/img/**/*',
  scss: 'src/scss/**/*.scss',
  js: 'src/js/**/*.js',
};

function css() {
  return src(paths.scss).pipe(sass()).pipe(dest('./build/css'));
}

function watchArchivos() {
  watch(paths.scss, css); // * = La carpeta actual - ** = Todos los archivos con esa extensión
  // watch(paths.js, javascript);
}

exports.css = css;
exports.watchArchivos = watchArchivos;

exports.default = series(css, watchArchivos);
