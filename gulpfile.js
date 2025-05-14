const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

gulp.task("sass", () => {
  return gulp
    .src("./src/scss/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest("./src/css"))
    .pipe(browserSync.stream());
});

gulp.task("serve", () => {
  browserSync.init({
    server: "./src",
  });

  gulp.watch("./src/scss/**/*.scss", gulp.series("sass"));
  gulp.watch("./src/*.html").on("change", browserSync.reload);
  gulp.watch("./src/js/**/*.js").on("change", browserSync.reload);
});

gulp.task("default", gulp.series("sass", "serve"));
