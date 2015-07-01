module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            build: ['dist/*']
        },

        copy: {
            js: {
                files: [{
                    expand: true,
                    src: ['**/*.js', '*.js'],
                    dest: 'build',
                    cwd: 'src'
                }]
            }
        },

        eslint: {
            source: {
                src: ['src/{,*/}*.js', '!src/{,*/}__tests__/*.js']
            },

            tests: {
                src: ['src/{,*/}__tests__/*.js']
            },

            scripts: {
                src: ['Gruntfile.js']
            }
        }

    });

    grunt.registerTask('lint', [
        'eslint'
    ]);

};
