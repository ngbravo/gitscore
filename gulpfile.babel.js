// generated on 2017-03-05 using generator-chrome-extension 0.6.1
import gulp from 'gulp';
import gutil from 'gulp-util';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import runSequence from 'run-sequence';
import {stream as wiredep} from 'wiredep';
import webpack from 'webpack';
import gulpWebpack from 'webpack-stream';
import WebpackDevServer from 'webpack-dev-server';
import webpackProdConfig from './webpack/webpack.prod';
import webpackDevConfig from './webpack/webpack.dev';


const $ = gulpLoadPlugins();

function extras(dest) {
  return gulp.src([
    'app/*.*',
    'app/_locales/**',
    '!app/scripts.babel',
    '!app/*.json',
    '!app/*.html',
  ], {
    base: 'app',
    dot: true
  }).pipe(gulp.dest(dest));
}

gulp.task('extras', () => extras('dist'));
gulp.task('extras:dev', () => extras('temp'));

function lint(files, options) {
  return () => {
    return gulp.src(files)
      .pipe($.eslint(options))
      .pipe($.eslint.format());
  };
}

gulp.task('lint', lint('app/scripts.babel/**/*.js', {
  env: {
    es6: true
  }
}));

function images(dest) {
  {
  return gulp.src('app/images/**/*')
    .pipe($.if($.if.isFile, $.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    }))
    .on('error', function(err) {
      console.log(err);
      this.end();
    })))
    .pipe(gulp.dest(`${dest}/images`));
}
}

gulp.task('images', () => images('dist'));
gulp.task('images:dev', () => images('temp'));

/* Deprecated */
gulp.task('html', () => {
  return gulp.src('app/*.html')
    .pipe($.useref({searchPath: ['temp', 'app', '.']}))
    .pipe($.sourcemaps.init())
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cleanCss({compatibility: '*'})))
    .pipe($.sourcemaps.write())
    .pipe($.if('*.html', $.htmlmin({removeComments: true, collapseWhitespace: true})))
    .pipe(gulp.dest('dist'));
});

/* Deprecated */
gulp.task('chromeManifest', () => {
  return gulp.src('app/manifest.json')
    .pipe($.chromeManifest({
      buildnumber: true,
      background: {
        target: 'scripts/background.js',
        exclude: [
          'scripts/chromereload.js'
        ]
      }
  }))
  .pipe($.if('*.css', $.cleanCss({compatibility: '*'})))
  .pipe($.if('*.js', $.sourcemaps.init()))
  .pipe($.if('*.js', $.uglify()))
  .pipe($.if('*.js', $.sourcemaps.write('.')))
  .pipe(gulp.dest('dist'));
});


gulp.task('clean', del.bind(null, ['temp', 'dist']));

/* Deprecated */
gulp.task('size', () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

/* Deprecated */
gulp.task('wiredep', () => {
  gulp.src('app/*.html')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('package', function () {
  var manifest = require('./dist/manifest.json');
  return gulp.src('dist/**')
      .pipe($.zip('gitscore-' + manifest.version + '.zip'))
      .pipe(gulp.dest('package'));
});
/**
 * Webpack tasks
 */

gulp.task('webpack:dist', function() {
  return gulp.src(webpackProdConfig.entry.background)
    .pipe(gulpWebpack(webpackProdConfig, webpack))
    .pipe(gulp.dest(webpackProdConfig.output.path));
});

gulp.task('webpack:dev', function() {
  return gulp.src(webpackDevConfig.entry.background)
    .pipe(gulpWebpack(webpackDevConfig, webpack))
    .pipe(gulp.dest(webpackDevConfig.output.path));
});

gulp.task('build', (cb) => {
  runSequence(
    'lint', 'clean', 'copy-manifest', 'webpack:dist',
    ['images', 'extras'],
    'size', cb);
});

gulp.task('build:dev', (cb) => {
  runSequence(
    'lint', 'clean', 'copy-manifest:dev', 'webpack:dev',
    ['images:dev', 'extras:dev'],
    'size', cb);
});

gulp.task('copy-manifest', function() {
  return gulp.src('app/manifest.json')
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-manifest:dev', function() {
  return gulp.src('app/manifest.json')
    .pipe(gulp.dest('temp'));
});

gulp.task('webpack-dev-server', function(callback) {
  const myConfig = {
    hot: true,
    quiet: false,
    noInfo: false,
    stats: {
      colors: true,
    },
  };
  // Start a webpack-dev-server
  new WebpackDevServer(webpack(webpackDevConfig), myConfig
  ).listen(8080, 'localhost', function(err) {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
      gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
    });
 });

gulp.task('watch', () => {
  return gulp.watch([
    'app/*.html',
    'app/scripts.babel/**/*.js',
    'app/images/**/*',
    'app/styles/**/*',
    'app/_locales/**/*.json',
  ], ['build:dev']);
});

gulp.task('serve', (cb) => {
  runSequence(
    'lint', 'clean', 'copy-manifest:dev',
    ['images:dev', 'extras:dev'],
    'webpack-dev-server', 'watch',
    cb);
});

gulp.task('size', () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], cb => {
  runSequence('build', cb);
});
