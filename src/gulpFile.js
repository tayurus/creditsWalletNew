let gulp = require("gulp");
let jade = require("gulp-jade");
let autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
let cleanCSS = require('gulp-clean-css');
var urlAdjuster = require('gulp-css-url-adjuster');

// SOURCES
let src = {
    css: ["**/*.css", "!node_modules/**/*.css"],
    js: ["**/*.js", "!node_modules/**/*.js", "!gulpFile.js"],
    pages: ["pages/**/*.jade"],
    img: ["**/*.png", "**/*.jpg", "**/*.svg", "**/*.ico"],
}

let dist = {
    main: "../dist/",
    img: "../dist/img"
}

gulp.task("build", function() {
    //PAGES
    gulp.src(src.pages).pipe(jade({
        pretty: "\t"
    })).pipe(gulp.dest(dist.main));

    // IMG
    gulp.src(src.img).pipe(rename({
        dirname: ''
    })).pipe(gulp.dest(dist.img));

    //CSS
    let autoprefixBrowsers = ['> 5%', 'last 2 versions', 'IE 11'];
    gulp.src(src.css)
        .pipe(concat("styles.css"))
        // .pipe(cleanCSS())
        .pipe(autoprefixer({
            browsers: autoprefixBrowsers
        }))
        .pipe(gulp.dest(dist.main));

    //JS
    gulp.src(src.js).pipe(concat("script.js")).pipe(gulp.dest(dist.main));

    //FONTS
    gulp.src("fonts/**/*.*",  { base: './' }).pipe(gulp.dest(dist.main));
})

gulp.task("watch", ["build"], function() {
    gulp.watch(Object.values(src), ["build"]);
})
//
// .pipe(urlAdjuster({
// replace: ['img/', '../img/']
// })).pipe(urlAdjuster({
// replace: ['fonts/', '../fonts/']
// }))
