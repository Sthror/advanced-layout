const { src, dest, watch, series } = require('gulp');
const cl = require('gulp-clean');
const browserSync = require('browser-sync').create();



const clean = () => {
  return src('dist/**/*').pipe(cl());
}

const copy = () => {
  return src('src/**/*.*')
    .pipe(dest('dist'));
}

const watchers = (done) => {
  watch('src/**/*.html').on('all', series(copy, browserSync.reload));
  done();
}

const server = (done) => {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
    open: false
  });
  done();
};

function defaultTask(cb) {
  // Здесь будет код вашей задачи, выполняемой по умолчанию 
  cb();
}

exports.default = series(clean, copy, watchers, server)