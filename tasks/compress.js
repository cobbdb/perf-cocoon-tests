module.exports = function (grunt) {
    grunt.config.merge({
        compress: {
            build: {
                options: {
                    archive: 'app.zip'
                },
                src: [
                    'dist/**',
                    'index.html'
                ]
            }
        }
    });
};
