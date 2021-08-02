const { series, src, dest, watch } = require('gulp');
const gulpSass = require('gulp-sass');
const dartSass = require('dart-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');

const sass = gulpSass(dartSass);

const paths = {
  imagenes: 'src/img/**/*',
  scss: 'src/scss/**/*.scss',
  js: 'src/js/**/*.js',
};

function css() {
  return src(paths.scss)
    .pipe(
      sass({
        outputStyle: 'compressed',
      }),
    )
    .pipe(dest('./build/css'));
}

function imagenes() {
  return src(paths.imagenes)
    .pipe(imagemin())
    .pipe(dest('./build/img'))
    .pipe(notify({ message: '"Imagen Minificada"' }));
}

function versionWebp() {
  return src(paths.imagenes)
    .pipe(webp())
    .pipe(dest('./build/img'))
    .pipe(notify({ message: 'Versión webP lista' }));
}

function watchArchivos() {
  watch(paths.scss, css); // * = La carpeta actual - ** = Todos los archivos con esa extensión
  // watch(paths.js, javascript);
}

exports.css = css;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;

exports.default = series(css, imagenes, versionWebp, watchArchivos);
