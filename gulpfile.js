var gulp = require('gulp');
var del = require('del');
var zip = require('gulp-zip');
var ts = require('gulp-typescript');

var identifier = 'com.lissenberg.ContextCodeGenerator';
var extensionsDir = '/Library/Containers/com.luckymarmot.Paw/Data/Library/Application Support/com.luckymarmot.Paw/Extensions/';
var homeDir = process.env.HOME || process.env.HOMEPATH;

var paths = {
    scripts: ['src/**/*.ts'],
    paw: homeDir + extensionsDir,
    build: 'build/',
    dist: 'dist'
}

gulp.task('clean', function () {
    del(paths.dist);
    del(paths.build);
});


gulp.task('build', function () {
    var tsResult = gulp.src(paths.scripts)
        .pipe(ts({
            target: 'ES3',
            noImplicitAny: true,
            out: identifier.split('.').pop() + '.js'
        }));
    return tsResult.js.pipe(gulp.dest(paths.build + identifier));
});


gulp.task('install', function () {
    return gulp.src(paths.build + '/**/*')
        .pipe(gulp.dest(paths.paw));
})

gulp.task('zip', function () {
    var fileName = identifier.split('.').pop() + '.zip';
    return gulp.src(paths.build + '**/*')
        .pipe(zip(fileName))
        .pipe(gulp.dest(paths.dist));
});


gulp.task('default', ['build']);

