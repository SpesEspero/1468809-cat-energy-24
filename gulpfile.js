import gulp from "gulp";
import plumber from "gulp-plumber";
import less from "gulp-less";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import browser from "browser-sync";
import csso from "postcss-csso";
import rename from "gulp-rename";
import htmlmin from "gulp-htmlmin";
import del from "del";
import svgstore from "gulp-svgstore";
import terser from "gulp-terser";
import svgo from "gulp-svgmin";
import squoosh from "gulp-libsquoosh";

// Styles
export const styles = () => {
  return gulp
    .src("source/less/style.less", { sourcemaps: true })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([autoprefixer(), csso()]))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css", { sourcemaps: "." }))
    .pipe(browser.stream());
};

// HTML
const html = () => {
  return gulp
    .src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
};

// Script
const script = () => {
  return gulp.src("source/js/*.js").pipe(terser()).pipe(gulp.dest("build/js"));
};

// Images
const optimizeImages = () => {
  return gulp
    .src(["source/img/**/*.{png,jpg}", "!source/img/favicons/*.png"])
    .pipe(squoosh())
    .pipe(gulp.dest("build/img"));
};

const copyImages = () => {
  return gulp
    .src(["source/img/**/*.{png,jpg}", "!source/img/favicons/*.png"])
    .pipe(gulp.dest("build/img"));
};

const webp = () => {
  return gulp
    .src(["source/img/**/*.{png,jpg}", "!source/img/favicons/*.png"])
    .pipe(
      squoosh({
        webp: {},
      })
    )
    .pipe(gulp.dest("build/img"));
};

// Svg
const svg = () => {
  return gulp
    .src(["source/img/**/*.svg", "!source/img/sprite/*.svg"])
    .pipe(svgo())

    .pipe(gulp.dest("build/img"));
};

const sprite = () => {
  return gulp
    .src("source/img/sprite/*.svg")
    .pipe(svgo())
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
};

// Copy
const copy = (done) => {
  gulp
    .src(
      ["source/fonts/*.{woff,woff2}", "source/*.ico", "source/img/favicons/*"],
      {
        base: "source",
      }
    )
    .pipe(gulp.dest("build"));
  done();
};

const clean = () => {
  return del("build");
};

// Server
const server = (done) => {
  browser.init({
    server: {
      baseDir: "build",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

// Reload
const reload = (done) => {
  browser.reload();
  done();
};

// Watcher

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series(styles));
  gulp.watch("source/js/*.js", gulp.series(script));
  gulp.watch("source/*.html", gulp.series(html, reload));
};

export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(styles, html, script, svg, sprite, webp)
);

// Default
export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(styles, html, script, svg, sprite, webp),
  server,
  watcher
);
