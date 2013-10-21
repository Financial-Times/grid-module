module.exports = function(grunt) {
  "use strict";
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: ['src/behavior/boxsizing/head', 'tmp/behavior/boxsizing/script.js', 'src/behavior/boxsizing/foot'],
        dest: 'dist/behavior/boxsizing.htc'
      },
      dev: {
        src: ['src/behavior/boxsizing/head', 'src/behavior/boxsizing/script.js', 'src/behavior/boxsizing/foot'],
        dest: 'build/behavior/boxsizing.htc'
      }
    },
    uglify: {
      dist: {
        options: {compress: true},
        files: {
          './tmp/behavior/boxsizing/script.js': ['src/behavior/boxsizing/script.js']
        }
      }
    },
    watch: {
      sass: {
        files: ['src/scss/**/*'],
        tasks: ['sass']
      }
    },
    sass: {                              
      dev: {                            
        options: {                       
          style: 'expanded'
        },
        files: {
          './build/css/grid-default.css': './src/scss/bundles/default.scss', // 'destination': 'source'
          './build/css/grid-responsive.css': './src/scss/bundles/responsive-only.scss', // 'destination': 'source'
          './build/css/grid-legacy.css': './src/scss/bundles/legacy.scss', // 'destination': 'source'
          './build/css/docs.css': './src/scss/docs/docs.scss'
        }
      },
      dist: {                            
        options: {                       
          style: 'compressed'
        },
        files: {
          './dist/css/grid.<%= pkg.version %>.min.css': './src/scss/bundles/responsive.scss', // 'destination': 'source'
          './dist/css/grid-legacy.<%= pkg.version %>.min.css': './src/scss/bundles/legacy.scss'
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'node/**/*.js'],
      jshintrc: './.jshintrc'
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'uglify', 'concat', 'sass']);

  // grunt.registerTask('restart', 'Restarting node app', function () {
  //   // Need to look into how grunt can run the app as a child process
  //   //
  //   // http://web-archive-me.com/page/1254392/2013-01-29/http://cobbweb.me/blog/2012/06/07/using-grunt-dot-js-to-build-your-frontend-in-a-node-dot-js-slash-express-dot-js-app/
  //   // http://stackoverflow.com/questions/15044026/running-node-app-through-grunt
  //   // http://stackoverflow.com/questions/13889037/running-node-app-from-grunt-with-watch
  // });

};