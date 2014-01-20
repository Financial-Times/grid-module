module.exports = function(grunt) {
  "use strict";

  var demoPageTypes = 'responsive,default,legacy,non-fluid,resized,disabled,always-fixed,always-responsive'.split(',');

  function constructDemoPagesConfig () {
    var output = {};

    demoPageTypes.map(function (type) {
      var conf =  {
        src: './docs-generator/grid.hbs',
        engine: "handlebars",
        dest: './docs/grid-' + type + '.html',
        variables: {
          title: type.substr(0, 1).toUpperCase() + type.substr(1) + " grid examples",
          example: require('./docs-generator/examples.json')
        }
      };
      conf.variables[type] = true;
      if (!/default|legacy/.test(type)) {
        conf.variables.isResponsive = true;
      }
      output[type] = conf;

    });
    return output;
  }


// var spans = [0, 12, 11, 10, 9],
//   prefixes = ['', 'S', 'M', 'L', 'XL'];

// var selector = spans.map(function (span, index) {
//   if (typeof span != 'undefined') {
//     return prefixes[index] + span;
//   }
// }).filter(function (span) {
//   return typeof span != 'undefined';
// }).join(' ');

// var comparitors = spans.map(function (span, index) {
//   var selector;
//   if (index > 0 && typeof span != 'undefined') {
//     selector = prefixes.slice(1).filter(function (prefix) {
//       return prefix != prefixes[index];
//     }).map(function (item) {
//       return item + '0';
//     })
//     selector.push(span);
//     return selector.join(' ');
//   } else {
//     return undefined
//   }
  
// }).filter(function (span) {
//   return typeof span != 'undefined';
// });


  function constructDemoPagesSassConfig () {
    var output = {};
    demoPageTypes.map(function (type) {
      if (type !== 'legacy') {
        output['./docs/css/grid-' + type + '.css'] = './docs-generator/scss/bundles/' + type + '.scss';
      }
      
    });

    output['./docs/css/docs.css'] = ['./docs-generator/scss/docs.scss'];
    return output;
  }

  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      sass: {
        files: ['src/scss/**/*'],
        tasks: ['sass']
      }
    },
    sass: {
      docs: {
        options: {
          style: 'expanded',
          loadPath: ['.', './bower_components/']
        },
        files: constructDemoPagesSassConfig()
      }
    },
    jshint: {
      files: ['Gruntfile.js'],
      jshintrc: './.jshintrc'
    },
    template: constructDemoPagesConfig(),
    markdown: {
      docs: {
        files: [
          {
            expand: true,
            src: './README.md',
            dest: './docs/',
            ext: '.html',
            rename: function () {
              return './docs/index.html';
            }
          }
        ],
        options: {
          template: './docs-generator/markdown-wrapper.jst',
          preCompile: function() {},
          postCompile: function() {},
          templateContext: {}
        }
      }
    },
    prettify: {
      docs: {
        expand: true,
        cwd: './docs/',
        src: ['*.html'],
        dest: './docs/'
      }
    },
    clean: {
      before: ['./docs', './tmp'],
      after: ['./tmp']
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-templater');
  grunt.loadNpmTasks('grunt-markdown');
  grunt.loadNpmTasks('grunt-prettify');

  // Default task(s).
  grunt.registerTask('default', ['clean:before', 'jshint', 'docs', 'clean:after']);

  grunt.registerTask('docs', 'Generating static documentation files', function () {
    var handlebars = require('handlebars');

    handlebars.registerPartial('column', grunt.file.read('./docs-generator/partials/column.hbs', {encoding: 'utf8'}));
    handlebars.registerPartial('examples', grunt.file.read('./docs-generator/partials/examples.hbs', {encoding: 'utf8'}));
    handlebars.registerPartial('custom-examples', grunt.file.read('./docs-generator/partials/custom-examples.hbs', {encoding: 'utf8'}));
    handlebars.registerPartial('unresponsive', grunt.file.read('./docs-generator/partials/unresponsive.hbs', {encoding: 'utf8'}));
    handlebars.registerPartial('overrides', grunt.file.read('./docs-generator/partials/overrides.hbs', {encoding: 'utf8'}));
    handlebars.registerPartial('head', grunt.file.read('./docs-generator/partials/head.hbs', {encoding: 'utf8'}));

    grunt.task.run(['template', 'markdown', 'prettify:docs', 'sass', 'finalDocsCleanup']);
  });

  grunt.registerTask('finalDocsCleanup', function () {
    grunt.file.copy('./docs-generator/js/jquery.toc.min.js', './docs/js/jquery.toc.min.js');
    grunt.file.copy('./bower_components/o-useragent/polyfills/boxsizing.htc', './docs/polyfills/boxsizing.htc');
  });
};