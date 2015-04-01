var gulpFilter = require('gulp-filter'),
    cram = require('gulp-cram'),
    uglify = require('gulp-uglify'),
    bowerSrc = require('gulp-bower-src'),
    sourcemaps = require('gulp-sourcemaps'),
    cssMinify = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngcrush = require('imagemin-pngcrush'),
    less = require('gulp-less'),
    gulp = require('gulp'),
    path = require('path'),
    Builder = require('systemjs-builder');

var paths = {
	run: 'src/run.js',
    baseUrl: 'file:' + process.cwd() + '/src/',
    bowerLibs: ['src/lib/**', '!src/lib/*/test/*'],
    css: {
        files: ['src/css/*.css'],
        root: 'src/css'
    },
    less: ['src/less/*'],
    assets: ["src/cache.manifest"],
    images: ["src/img*/**"],
    destination: './dist/'
};

// Optimize application CSS files and copy to "dist" folder
gulp.task('optimize-and-copy-css', function() {
    return gulp.src(paths.css.files)
        .pipe(cssMinify({root : paths.css.root, noRebase: true}))
        .pipe(gulp.dest(paths.destination + 'css'));
});

// Optimize application JavaScript files and copy to "dist" folder
//gulp.task('optimize-and-copy-js', function(cb) {
//    var builder = new Builder({
//        baseURL: paths.baseUrl,
//        map: {
//        	jquery: paths.baseUrl + 'lib/jquery/dist/jquery.min'
//        }
//    });
//    builder.build('app/app', paths.destination + 'app/app.js', { minify: true, sourceMaps: true })
//        .then(function() {
//            cb();
//        })
//        .catch(function(err) {
//            cb(err);
//        });
//});

//cram and uglify JavaScript source files
gulp.task('build-modules', function() {
    var opts = {
        includes: [ 'curl/loader/legacy', 'curl/loader/cjsm11'],
        excludes: ['gmaps']
    };

    return cram(paths.run, opts).into('run.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(paths.destination));
});

// Optimize bower-managed JavaScript dependencies and copy to "dist" folder
gulp.task('copy-bower-lib', function() {
    return gulp.src(paths.bowerLibs)
        .pipe(gulp.dest(paths.destination + 'lib'));
});

//copy main bower files (see bower.json) and optimize js
//gulp.task('bower-files', function() {
//    var filter = gulpFilter(["**/*.js", "!**/*.min.js"]);
//    return bowerSrc()
//        .pipe(sourcemaps.init())
//        .pipe(filter)
//        .pipe(uglify())
//        .pipe(filter.restore())
//        .pipe(sourcemaps.write("./"))
//        .pipe(gulp.dest(paths.destination + 'lib'));
//})


gulp.task('copy-images', function() {
    return gulp.src(paths.images)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest(paths.destination + '/img'))
});

//copy assets
gulp.task('copy-assets', function() {
    return gulp.src(paths.assets)
        .pipe(gulp.dest(paths.destination))
});

gulp.task('less', function () {
    return gulp.src(paths.less)
        .pipe(less())
        .pipe(cssMinify({noRebase: true}))
        .pipe(gulp.dest(paths.destination + '/css'));
});

gulp.task('build', ['optimize-and-copy-css', 'build-modules', 'copy-bower-lib',
    'copy-images', 'less', 'copy-assets'], function(){});