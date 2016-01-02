/**
 * Project task automation.
 *
 * Usage instructions: Can be found by running `grunt --help`.
 * Debug tip: Try running Grunt Tasks with the `--verbose` command
 */
module.exports = function (grunt) {

  var currentPlugin = {};

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-mysqldump');
  grunt.loadNpmTasks('grunt-jsbeautifier');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    meta: {
      banner: '/*! <%=pkg.name%> - v<%=pkg.version%> (build <%=pkg.build%>) - ' + '<%=grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT")%> */'
    },
    
    compass: {
      dev: {
        options: {
          config: 'config.rb'
        } 
      } 
    },

    jshint: {
      all: ['public/scripts/*.js']
    },

    uglify: {
      options: {
        banner: '/*! <%=pkg.name%> - v<%=pkg.version%> (build <%=pkg.build%>) */',
        mangle: false,
        beautify: true,
        preserveComments: false
      },
      my_target: {
        files: {
          'public/js/script.js': ['public/js/script.js']
        }
      }
    },

    concat: {
      dist: {
        src: [
          'public/vendor/jquery/dist/jquery.js',
          'public/vendor/underscore/underscore.js',
          'public/vendor/bootstrap/dist/js/bootstrap.js',
          'public/vendor/jquery.pulsate/jquery.pulsate.min.js',
          'public/vendor/toastr/toastr.js',
          'public/vendor/pikaday/pikaday.js',
          'public/vendor/jquery.tagsinput/src/jquery.tagsinput.js',
          'public/vendor/bootstrap-datepicker/dist/js/bootstrap-datepicker.js',
          
          'public/vendor/datatables/media/js/jquery.dataTables.js',
          'public/vendor/datatables/media/js/dataTables.bootstrap.js',
          
          'public/scripts/app.js'
        ],
        dest: 'public/js/script.js'
      }
    },

    cssmin: {
      combine: {
        files: {
          'public/css/style.min.css': [
             'public/vendor/bootstrap/dist/css/bootstrap.css', 
             'public/vendor/font-awesome/css/font-awesome.css',
             'public/vendor/toastr/toastr.css',
             'public/vendor/pikaday/css/pikaday.css',
             //'public/vendor/jquery.tagsinput/src/jquery.tagsinput.css',
             
             'public/vendor/datatables/media/css/jquery.dataTables.css',
             'public/vendor/datatables/media/css/dataTables.bootstrap.css',
             
             'public/vendor/bootstrap-datepicker/dist/css/bootstrap-datepicker.css',
             'public/css/reset.css', 
             'public/css/tools.css', 
             'public/css/style.css', 
             'public/css/responsive.css'
           ]
        }
      },
      minify: {
        expand: true,
        cwd: 'public/css/',
        src: ['style.min.css'],
        dest: 'public/css/'
      }
    },

    watch: {
      options: {
        livereload: true
      },
      scripts: {
        files: ['public/scripts/*.js'],
        tasks: ['concat','uglify']
      },
      sass: {
        files: ['public/stylesheets/*.scss'],
        tasks: ['compass','cssmin']
      },
      phtml: {
        files: ['module/**/*.phtml']
      },
      php: {
        files: ['module/**/*.php']
      }
    },

    compress: {
      main: {
        options: {
          mode: 'zip',
          pretty: true,
          archive: function () {
            return 'backup/' + grunt.template.today('yyyy-mm-dd') + '-' + currentPlugin.name + '.zip';
          }
        },
        files: [{
          expand: true,
          src: [
            '**',
            '!vendor/**',
            '!node_modules/**',
            '!public/vendor/**',
            '!public/backup/**'
          ],
        }]
      },
    },
    
    mysqlcfg: grunt.file.readJSON('config/database.json'),
    
    mysqldump: {
      dist: {
        user: '<%= mysqlcfg.local.user %>',
        pass: '<%= mysqlcfg.local.pass %>',
        host: '<%= mysqlcfg.local.host %>',
        port: '<%= mysqlcfg.local.port %>',
        dest: 'backup/',
        options: {
          compress: true,
          algorithm: 'zip',
          level: 5,
          both: false
        },
        databases: [
          'project_resource',
        ],
      },
    },

    jsbeautifier: {
      files: ['public/scripts/*.js'],
      options: {

      }
    }
    
  });

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('js', ['jsbeautifier','concat', 'uglify']);
  grunt.registerTask('css', ['compass','cssmin']);
  grunt.registerTask('compile', ['concat', 'uglify', 'compass', 'cssmin']);
  grunt.task.registerTask('backup', 'Running compress website backup.', function (name) {
    if (!arguments.length) grunt.fail.fatal('Usage: grunt backup:<name>');
    currentPlugin.name = name;
    grunt.task.run('compress:main');
  });

}
