module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      bundle: {
        files: {
          'public/scripts.min.js': ['public/scripts.js']
        }
      }
    },    

    browserify: {
      main: {
        options: {
          debug: false,
          transform: ['reactify'],
          aliasMappings: [
            {
              cwd: 'app/views',
              src: ['**/*.jsx'],
              dest: 'app/views',
              rename: function(cwd, src) {
                // Little hack to ensure that file extension is preserved.
                var ext = src.split('.').pop();
                return cwd + '/' + src + '.' + ext;
              }
            }
          ],
          alias: ['jquery-browserify:jquery'],
        },
        files: {
          'public/scripts.js': 'app/initialize.js',
        },
      },
    },

    less: {
      development: {
        options: {
          paths: ["assets/styles"]
        },
        files: {
          "public/styles.css": "assets/styles/styles.less"
        }
      }
    },

    postcss: {
      options: {
        map: false, // inline sourcemaps

        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({browsers: 'last 10 versions'}), // add vendor prefixes
          require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: 'public/styles.css'
      }
    }, 

    nodemon: {
      main: {},
      debug: {
        options: {
          nodeArgs: ['--debug']
        }
      }
    },

    watch: {
      app: {
        files: 'app/**/*',
        tasks: ['browserify']
      },
      styles: {
        files: 'assets/styles/**/*',
        tasks: ['less:development', "postcss"]
      },
      lib: {
        files: 'lib/**/*',
        tasks: ['browserify']
      }
    },

    concurrent: {
      main: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      },

      debug: {
        tasks: ['nodemon:debug', 'watch', 'node-inspector'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    'node-inspector': {
      main: {}
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.registerTask('compile', ['browserify', 'uglify', 'less:development', 'postcss']);
  grunt.registerTask('default', ['compile']);
  grunt.registerTask('server', ['compile', 'concurrent']);
  grunt.registerTask('server:debug', ['compile', 'concurrent:debug']);
};
