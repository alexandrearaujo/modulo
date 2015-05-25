'use strict';

var uglify = require('gulp-uglify'),
	mainBowerFiles = require('main-bower-files'),
    sourcemaps = require('gulp-sourcemaps'),
    cssMinify = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngcrush = require('imagemin-pngcrush'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    gulpFilter = require('gulp-filter'),
    gulp = require('gulp'),
    path = require('path');

var paths = {
    baseUrl: 'file:' + process.cwd() + '/src/',
    bowerLibs: ['src/lib'],
    css: {
        files: ['src/css/*.css'],
        root: 'src/css'
    },
    less: ['src/less/*.less'],
    lessComponents: ['src/less/components/*.less'],
    assets: ["src/cache.manifest"],
    images: ["src/img*/**"],
    components: ['src/components/**'],
    app: ['src/app/**'],
    destination: './dist/'
};

// Optimize application CSS files and copy to "dist" folder
gulp.task('optimize-and-copy-css', function() {
    return gulp.src(paths.css.files)
    	.pipe(sourcemaps.init())
        .pipe(cssMinify({root : paths.css.root}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.destination + 'css'));
});

gulp.task('copy-css-to-target', function() {
    return gulp.src('dist/css/**')
	        .pipe(gulp.dest('./target/classes/static/css'));
});

gulp.task('copy-components-js', function() {
	return gulp.src(paths.components)
	.pipe(sourcemaps.init())
	.pipe(uglify().on('error', function(e) { console.log('\x07',e.message); return this.end(); }))
	.pipe(concat('components.js'))
	.pipe(sourcemaps.write("./"))
	.pipe(gulp.dest(paths.destination + 'components'));
});

gulp.task('copy-components-to-target', function() {
    return gulp.src('dist/components/**')
	        .pipe(gulp.dest('./target/classes/static/components'));
});

gulp.task('copy-app-js', function() {
	return gulp.src(paths.app)
	.pipe(sourcemaps.init())
	.pipe(uglify().on('error', function(e) { console.log('\x07',e.message); return this.end(); }))
	.pipe(sourcemaps.write("./"))
	.pipe(gulp.dest(paths.destination + 'app'));
});

gulp.task('copy-app-js-to-target', function() {
    return gulp.src('dist/app/**')
	        .pipe(gulp.dest('./target/classes/static/app'));
});

//copy main bower files (see bower.json) and optimize js
gulp.task('copy-bower-libs', function() {
    return gulp.src(mainBowerFiles(), { base: 'src/lib/' })
	        .pipe(gulp.dest(paths.destination + 'lib'));
});

gulp.task('copy-images', function() {
    return gulp.src(paths.images)
	        .pipe(imagemin({
	            progressive: true,
	            svgoPlugins: [{removeViewBox: false}],
	            use: [pngcrush()]
	        }))
	        .pipe(gulp.dest(paths.destination));
});

//copy assets
gulp.task('copy-assets', function() {
    return gulp.src(paths.assets)
        .pipe(gulp.dest(paths.destination))
});

gulp.task('less', function () {
    return gulp.src(paths.less)
    	.pipe(sourcemaps.init())
        .pipe(less())
        .pipe(cssMinify({noRebase: true}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.destination + '/css'));
});

gulp.task('lessComponents', function () {
    return gulp.src(paths.lessComponents)
    	.pipe(sourcemaps.init())
        .pipe(less())
        .pipe(cssMinify({noRebase: true}))
        .pipe(sourcemaps.write())
        .pipe(concat('components.css'))
        .pipe(gulp.dest(paths.destination + '/css'));
});

gulp.task('default', ['less'], function(){});