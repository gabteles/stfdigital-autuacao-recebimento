'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

function isOnlyChange(event)
{
    return event.type === 'changed';
}

gulp.task('watch', ['inject'], function ()
{
    gulp.watch([path.join(conf.paths.src, '/app/main/**/*.ts')], ['compile-ts']);
});