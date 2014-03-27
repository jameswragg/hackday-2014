module.exports = function(grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            build: {
                src: ['dist/']
            }
        },

        // useminPrepare: {
        //     html: ['dist/index.html'],
        //     options: {
        //         root: 'src/',
        //         dest: 'dist/'
        //     }
        // },

        useminPrepare: {
            html: 'src/index.html',
            options: {
                dest: 'dist',
                root: 'src',
            }
        },
        usemin: {
            html: 'dist/index.html'
        },


        // concat: {
        //     options: {
        //         separator: ';'
        //     },
        //     // dist: {
        //     //     src: ['src/js/t*.js'],
        //     //     dest: 'dist/js/<%= pkg.name %>.js'
        //     // }
        // },

        // uglify: {
        //     options: {
        //         banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        //     },
        //     dist: {
        //         files: {
        //             'dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        //         }
        //     }
        // },
        handlebars: {
            compile: {
                options: {
                    namespace: 'MyApp.Templates',
                    processName: function(filePath) {
                        var pathPieces = filePath.split("/");
                        var filename = pathPieces[pathPieces.length - 1];
                        var pieces = filename.split(".");

                        return pieces[pieces.length - 2]; // output: _header.hbs
                    }
                },
                files: {
                    "src/js/templates.js": ["src/templates/*.hbs"]
                }
            }
        },
        copy: {
            js: {
                files: [
                    // includes files within path
                    {
                        expand: true,
                        // flatten: true,
                        cwd: 'src/js',
                        src: ['**/*'],
                        dest: 'dist/js/'
                    }
                ]
            },
            bowers: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: 'bower_components/normalize.css/*.css',
                    dest: 'dist/css'
                }]
            },
            fonts: {
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: 'src/css/fonts/',
                    src: '*',
                    dest: 'dist/css/fonts/'
                }]
            },
            html: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['src/*.html'],
                    dest: 'dist/'
                }]
            }
        },

        sass: {
            dist: {
                files: {
                    "dist/css/styles.css": ["src/css/master.scss"]
                }
            }
        },

        connect: {
            server: {
                options: {
                    livereload: true,
                    port: 9001,
                    base: 'dist'
                }
            }
        },


        qunit: {
            files: ['test/**/*.html']
        },
        watch: {
            files: ['src/**/*'],
            tasks: ['regular'],
            livereload: {
                // Here we watch the files the sass task will compile to
                // These files are sent to the live reload server after sass compiles to them
                options: {
                    livereload: true
                },
                files: ['dist/**/*'],
            },
            // tasks: ['jshint', 'qunit']
        }
    });


    grunt.registerTask('test', ['jshint', 'qunit']);
    grunt.registerTask('use', ['useminPrepare', 'usemin', 'concat', 'uglify'])

    grunt.registerTask('regular', ['clean', 'handlebars', 'sass', 'copy:bowers', 'copy:fonts', 'copy:html', 'copy:js']);
    grunt.registerTask('default', ['regular', 'use', 'connect', 'watch']);
    grunt.registerTask('dev', ['regular', 'connect', 'watch']);

};