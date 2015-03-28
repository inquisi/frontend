// karma.conf.js
module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        files: ['*.js'],
        browsers: ['PhantomJS'],
        plugins: ['karma-jasmine', 'karma-phantomjs-launcher']
    });
};