module.exports = function(grunt) {

  grunt.initConfig({
    clean: {
        dev : ['build','dist'],
        full : ['build', 'dist', '.sass-cache', 'bower_components', 'node_modules']
    },
    wiredep: {
      html : {
        src: ['app/*.html']
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'app/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    sass: {
      dist : {
        files : {
          'build/styles/main.css' : 'app/styles/*.scss'
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/scripts/main.min.js' : 'app/scripts/*.js'
        }
      }
    },
    cssmin: {
      dist: {
        files: {
          'dist/styles/main.min.css' : 'build/styles/main.css'
        }
      }
    },
    copy: {
      app: {
        files: [
          {
            expand: true,
            src: ['app/*.html'],
            dest: 'dist/',
            flatten: true
          }
        ]
      },
      deps: {
        files: [
          {
            expand: true,
            src: ['bower_components/**'],
            dest: 'dist/'
          }
        ]
      }
    },
    watch: {
      options: {
        livereload: true
      },
      js: {
        files: ['app/scripts/*.js'],
        tasks: ['jshint', 'uglify']
      },
      css: {
        files: ['app/styles/*.scss'],
        tasks: ['sass','cssmin']
      },
      html: {
        files: ['app/*.html'],
        tasks: ['copy:app']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-wiredep');


  grunt.registerTask('build', ['wiredep','jshint', 'sass', 'uglify', 'cssmin', 'copy']);
  grunt.registerTask('default', ['clean:dev', 'build', 'watch']);
};