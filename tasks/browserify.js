module.exports = function (grunt) {
    grunt.config.merge({
        browserify: {
            build: {
                files: {
                    'dist/perf.js': [
                        'src/*.js'
                    ]
                }
            }
        }
    });
};
