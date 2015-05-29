'use strict';

var uglify = require('gulp-uglify'),
	mainBowerFiles = require('main-bower-files'),
    sourcemaps = require('gulp-sourcemaps'),
    cssMinify = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngcrush = require('imagemin-pngcrush'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    changed = require('gulp-changed'),
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
    destination: './dist/'
};

gulp.task('optimize-and-copy-css', function() {
    return gulp.src(paths.css.files)
    		   .pipe(changed(paths.destination + 'css'))
    		   .pipe(sourcemaps.init())
    		   .pipe(cssMinify({root : paths.css.root}))
    		   .pipe(sourcemaps.write())
    		   .pipe(gulp.dest(paths.destination + 'css'));
});

gulp.task('copy-components-js', function() {
	return gulp.src(paths.components)
			   .pipe(changed(paths.destination + 'components'))
			   .pipe(sourcemaps.init())
			   .pipe(uglify().on('error', function(e) { console.log('\x07',e.message); return this.end(); }))
			   .pipe(concat('components.js'))
			   .pipe(sourcemaps.write("./"))
			   .pipe(gulp.dest(paths.destination + 'components'));
});

gulp.task('copy-bower-libs', function() {
    return gulp.src(mainBowerFiles(), { base: 'src/lib/' })
    		   .pipe(changed(paths.destination + 'lib'))
	           .pipe(gulp.dest(paths.destination + 'lib'));
});

gulp.task('copy-images', function() {
    return gulp.src(paths.images)
    	       .pipe(changed(paths.destination))
	           .pipe(imagemin({
	               progressive: true,
	               svgoPlugins: [{removeViewBox: false}],
	               use: [pngcrush()]
	           }))
	           .pipe(gulp.dest(paths.destination));
});

gulp.task('copy-assets', function() {
    return gulp.src(paths.assets)
    		   .pipe(changed(paths.destination))
               .pipe(gulp.dest(paths.destination))
});

gulp.task('less', function () {
    return gulp.src(paths.less)
    		   .pipe(changed(paths.destination + '/css'))
	    	   .pipe(sourcemaps.init())
	    	   .pipe(less())
	    	   .pipe(cssMinify({noRebase: true}))
	    	   .pipe(sourcemaps.write())
	    	   .pipe(gulp.dest(paths.destination + '/css'))
	    	   .on('error', gutil.log);
});

gulp.task('lessComponents', function () {
    return gulp.src(paths.lessComponents)
    		   .pipe(changed(paths.destination + '/css'))
    	       .pipe(sourcemaps.init())
    	       .pipe(less())
    	       .pipe(cssMinify({noRebase: true}))
    	       .pipe(sourcemaps.write())
    	       .pipe(concat('components.css'))
    	       .pipe(gulp.dest(paths.destination + '/css'))
    	       .on('error', gutil.log);
});