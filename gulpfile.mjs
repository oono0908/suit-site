import gulp from 'gulp';
import pug from 'gulp-pug';
import browserSync from 'browser-sync';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import plumber from 'gulp-plumber';
import changed from 'gulp-changed';
import imagemin, {mozjpeg, optipng} from 'gulp-imagemin';
import uglify from 'gulp-uglify';
import cleanCSS from 'gulp-clean-css';
import htmlmin from 'gulp-htmlmin';

const sass = gulpSass(dartSass);

const src = {
  root: 'src/',
  pug: ['src/pug/**/*.pug', '!src/pug/**/_*.pug'],
  pugbase: './src/pug',
  pugwatch: 'src/pug/**/*.pug',
  sass: ['./src/sass/**/*.scss', '!./src/sass/**/_*.scss'],
  sasswatch: './src/sass/**/*.scss',
  img:'./src/img/**/*',
  js: './src/js/**/*'
};
 
const dest = {
  root: './htdocs/',
  pug: './htdocs/',
  css: './htdocs/css/',
  img: './htdocs/img/',
  js: './htdocs/js/'
};

const img_task = () => (
    gulp.src(src.img,{ encoding: false })
    .pipe(changed(dest.img))
    .pipe(imagemin([
        mozjpeg({quality: 85, progressive: true}),
        optipng({optimizationLevel: 5})
    ]))
    .pipe(gulp.dest(dest.img))
);

const sass_task = () => {
  return gulp.src(src.sass)
  .pipe(plumber({
    errorHandler: (error) => {
    console.log(error.messageFormatted);
    },
  }))
  .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
  // .pipe(cleanCSS())
  .pipe(gulp.dest(dest.css))
  .pipe(browserSync.reload({stream:true}));
}

const pug_task = () => {
  return gulp.src(src.pug)
    .pipe(plumber())
    // .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(pug({
      pretty: true,
      basedir: src.pugbase
    }))
    .pipe(gulp.dest(dest.pug))
    .pipe(browserSync.reload({stream:true}));
}

const js_task = () => {
  return gulp.src(src.js)
    // .pipe(uglify())
    .pipe(gulp.dest(dest.js));
}

const server_task = () => {
  browserSync({
    server: {
      baseDir: dest.root,
    },
    startPath: '/',
  });
}
 
const watch_task = () => {
  gulp.watch(src.pugwatch, pug_task);
  gulp.watch(src.sass, sass_task);
  gulp.watch(src.img, img_task);
   gulp.watch(src.js, js_task);
}
 
export default gulp.parallel(watch_task, server_task, img_task);
export {pug_task as pug};
export {sass_task as sass};
export {server_task as server};
export {img_task as img};
export {watch_task as watch};
export {js_task as js};

