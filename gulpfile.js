var gulp = require('gulp');
var plumber = require('gulp-plumber');
var wiredep = require('wiredep').stream;
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');

gulp.task('bower', function () {
    gulp.src('./app/index.html')
        .pipe(wiredep({
            directory: './app/bower_components'
        }))
        .pipe(gulp.dest('./app'));
});

// local server
gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: "app"
        }
    });
});
gulp.task('bs-reload', function() {
    browserSync.reload();
});

gulp.task('script', function() {
    return gulp.src([
        'app/scripts/app.js',
        'app/scripts/directives/**/*.js',
        'app/scripts/filters/**/*.js'
    ])
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }}))
        .pipe(concat('common.js'))
        .pipe(gulp.dest('app/scripts'))
        .pipe(browserSync.reload({stream:true}));
});

// compile styles
gulp.task('styles', function() {
    gulp.src(['app/scss/main.scss'])
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }}))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('app/css/'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('coffee', function() {
    gulp.src('app/scripts/**/*.coffee')
        .pipe(coffee({bare: true}))
        .pipe(gulp.dest('app/scripts'));
});

// default
gulp.task('default', ['serve'], function() {
    gulp.watch('bower.json', ['bower']);
    gulp.watch('app/scripts/**/*.coffee', ['coffee']);
    gulp.watch('app/scripts/**/*.js', ['script']);
    gulp.watch("app/scss/**/*.scss", ['styles']);
    gulp.watch("app/**/*.html", ['bs-reload']);
});