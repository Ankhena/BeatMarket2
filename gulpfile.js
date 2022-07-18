let project_folder = require("path").basename(__dirname);
let source_folder = "src";

let path = {
  build: {
    html: project_folder + "/",
    css: project_folder + "/css/",
    js: project_folder + "/js/",
    img: project_folder + "/img/",
    fonts: project_folder + "/fonts/"
  },
  src: {
    html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
    css: [source_folder + "/scss/style.scss", source_folder + "/scss/app.scss", source_folder + "/scss/onboard.scss"],
    js: source_folder + "/js/script.js",
    js_min: source_folder + "/js/scripts/**/*.min.js",
    img: source_folder + "/img/**/*.+(png|jpg|gif|ico|webp|svg)",
    fonts: source_folder + "/fonts/**/*.ttf"
  },
  watch: {
    html: source_folder + "/*.html",
    css: source_folder + "/scss/**/*.scss",
    js: source_folder + "/js/**/*.js",
    img: source_folder + "/img/**/*.+(png|jpg|gif|ico|webp|svg)"
  },
  clean: "./" + project_folder + "/"
}

const {src, dest} = require("gulp");
const gulp = require("gulp");
const browsersync = require("browser-sync").create();
const fileinclude = require("gulp-file-include");
const del = require("del");
const scss = require('gulp-sass')(require('sass'));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const group_media = require("gulp-group-css-media-queries");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify-es").default;
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
// const webphtml = require("gulp-webp-html");
// const webpcss = require("gulp-webpcss");
const svgmin = require('gulp-svgmin');
// const cheerio = require('gulp-cheerio'); // вообще не использовался
// const replace = require('gulp-replace'); // вообще не использовался
// const ttf2woff = require("gulp-ttf2woff");
// const ttf2woff2 = require("gulp-ttf2woff2");

function browserSync(params) {
  browsersync.init({
    server: {
      baseDir: "./" + project_folder + "/"
    },
    port: 3000,
    notify: true
  })
}


// Удалила  .pipe(webphtml())
// Потому что это дописывало webp к svg

function html() {
  return src(path.src.html)
    .pipe(fileinclude())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}

function js() {
  return src(path.src.js)
    .pipe(fileinclude({
      prefix: "--"
    }))
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(
      rename({
        extname: ".min.js"
      })
    )
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}

function js_min() {
  return src(path.src.js_min)
    .pipe(dest(path.build.js))
}

//  .pipe(webpcss({baseClass: ".webp-support" }))
// удалила, никуда не применялось в сборке Алима

function css() {
  return src(path.src.css)
    .pipe(
      scss({
        outputStyle: "expanded"
      })
    )
    .pipe(group_media())
    // .pipe(
    //   autoprefixer({
    //     //overrideBrowserslist: ["last 5 versions"],
    //     //cascade: true
    //   })
    // )
    .pipe(postcss([
      autoprefixer()
    ]))

    .pipe(dest(path.build.css))
    .pipe(csso({
      restructure: false
    }))
    .pipe(
      rename({
        extname: ".min.css"
      })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
}

function images() {
  return src(path.src.img)
    .pipe(
      webp({
        quality: 95
      })
    )
    .pipe(dest(path.build.img))
    .pipe(src(path.src.img))
    .pipe(
      imagemin({
        progressive: true,
        interlaced: true,
        optimizationLevel: 3 // 0 to 7
      })
    )
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream())
}

// нет смысла конвертировать шрифты при каждой сборке
// если будет нужно, можно вынести в отдельный таск и запускать при необходимости.
// function fonts(params) {
//   src(path.src.fonts)
//     .pipe(ttf2woff())
//     .pipe(dest(path.build.fonts));
//   return src(path.src.fonts)
//     .pipe(ttf2woff2())
//     .pipe(dest(path.build.fonts));
// }


function fonts(params) {
  return src(path.src.fonts)
    .pipe(dest(path.build.fonts));
}

function watchFiles(params) {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
}

function clean(params) {
  return del(path.clean);
}

const build = gulp.series(clean, js_min, gulp.parallel(js, css, html, images, fonts));
const watch = gulp.parallel(build, watchFiles, browserSync);

exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;

