var gulp = require('gulp'),
    eslint = require('gulp-eslint'),
    mocha = require('gulp-mocha'),
    flow = require('gulp-flowtype'),
    babel = require('babel/register');

gulp.task('lint', function() {
    return gulp.src(['src/*.js', 'src/__tests__/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('typecheck', function() {
    return gulp.src(['src/*.js', 'src/__tests__/*.js'])
        .pipe(flow({
            all: false,
            weak: false,
            declarations: './build/flow',
            killFlow: false,
            beep: true,
            abort: false
        }));
});

gulp.task('test', ['lint'], function() {

    global.expect = require('chai').expect;
    global.sinon = require('sinon');
    global.document = {
        location: {
            pathname: ''
        }
    };

    global.window = {
        addEventListener() {}
    };

    return gulp.src(['src/__tests__/{,*/}*-test.js'])
            .pipe(mocha({
                compilers: {
                    js: babel
                },
                reporter: 'spec',
                ui: 'bdd'
            }));
});

gulp.task('default', ['lint', 'test']);
