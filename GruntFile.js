module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      build: {
        src: 'build/'
      }
    },

    copy: {
      main: {
        src: 'src/index.html',
        dest: 'build/index.html'
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'src/images',
          src: ['**/*.{png, jpg, gif}'],
          dest: 'build/images'
        }]
      }
    },

    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'build/css/main.css': 'src/sass/theme.scss'
        }
      }
    },

    watch: {
      scripts: {
        files: ['**/*.scss'],
        tasks: ['sass'],
      },
      options: {
        livereload: true
      }
    },

    express: {
      server: {
        options: {
          port: 3000,
          hostname: 'localhost',
          bases: 'build/',
          livereload: true
        }
      }
    },

    open: {
      dev: {
        path: 'http://localhost:3000',
        app: 'Google Chrome'
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-sass');
  
  // Default task(s)
  grunt.registerTask('imagemin', ['imagemin']);
  grunt.registerTask('server', ['express', 'open', 'watch']);
  grunt.registerTask('default', ['clean', 'copy', 'sass']);
};