module.exports = function(grunt) {
  'use strict';
  //All grunt related functions

  var adapter = grunt.option('adapter') ? grunt.option('adapter') : "localstorage" ;
  var environment ;
  if (grunt.cli.tasks[0] === 'release' || grunt.cli.tasks[0] === 'package_release') {
    environment = 'production' ;
  } else {
    environment = grunt.option('env') ? grunt.option('env') : "development" ;
  }

  console.log("Env: " + environment) ;
  grunt.initConfig({
    jshint: {
      files: [
        'gruntfile.js',
        'app/*.js',
        'app/models/*.js',
        'app/adapters/*.js',
        'app/controllers/*.js',
        'app/routes/*.js',
        'app/views/**/*.js',
        'app/helpers/*.js',
        'app/fixtures/*.js'
      ],
      options: {
        eqeqeq:true,
        eqnull:true,
        strict:false,
        globalstrict:true,
        latedef:true,
        undef:true,
        globals: {
          force:true,
          jQuery: true,
          console:true,
          module:true,
          document:true,
          Ember:true,
          $:true,
          App:true,
          window: true,
          moment: true,
          DS: true,
          sinon: true,
          CryptoJS: true
        }
      }
    },
    concat: {
      dist: {
        src:[
          'app/library/jquery-1.9.1.js',
          'app/library/handlebars.js',
          'app/library/moment.js',
          'app/library/fastclick.js',
          'app/library/sinon-1.7.1.js',
          'app/library/ember-1.0.0.js',
          'app/library/ember-data-1.0.beta.3.js',
          'app/library/localstorage_adapter.js',
          'app/library/hmac-sha256.js',
          'app/app.js',
          'app/environments/' + environment + '.js',
          'debug/templates.js',
          'app/models/*.js',
          'app/controllers/*.js',
          'app/routes/*.js',
          'app/views/**/*.js',
          'app/helpers/*.js',
          'app/fixtures/*.js',
          'app/adapters/' + adapter + ".js"
        ],
        dest:'debug/app.js'
      },
      test: {
        src:[
          'debug/app.js',
          'app/tests/_setup.js',
          'app/tests/unit/*.js',
          'app/tests/integration/*.js',
          'app/tests/functional/*.js'
        ],
        dest:'qunit/tests.js'
      }
    },
    sass: {
      css: {
        files: {
          'debug/app.css':'app/css/base.scss',
          'qunit/app.css':'app/css/base.scss'
        }
      }
    },
    ember_handlebars: {
      compile: {
        options: {
          processName: function(fileName) {
            var arr = fileName.split(".") ;
            var path = arr[arr.length - 2].split("/") ;
            path.shift() ;
            path.shift() ;
            var name = path.join("/") ;
            console.log(' - ' + name) ;
            return name;
          },
          processPartialName: function(fileName) {
            var arr = fileName.split(".") ;
            var path = arr[arr.length - 2].split("/") ;
            path.shift() ;
            path.shift() ;
            var name = path.join("/") ;
            console.log(' - ' + name) ;
            return name;
          }
        },
        files: {
          "debug/templates.js":[
            "app/templates/**/*.hbs"
          ]
        }
      }
    },
    clean: ["debug/images/", "release/images/"],
    copy: {
      main: {
        files: [
          {expand:true, cwd:'app/images/', src: ['**'], dest: 'debug/images/'},
          {expand:true, cwd:'app/images/', src: ['**'], dest: 'release/images/'}
        ]
      }
    },
    uglify: {
      build: {
        src: 'debug/app.js',
        dest:'release/app.min.js'
      }
    },
    cssmin: {
      compress: {
        files: {
          "release/app.min.css":["debug/app.css"]
        }
      }
    },
    watch: {
      scripts: {
        files: [
          'app/library/*.js',
          'app/*.js',
          'app/adapters/*.js',
          'app/controllers/*.js',
          'app/fixtures/*.js',
          'app/helpers/*.js',
          'app/views/**/*.js',
          'app/routes/*.js',
          'app/css/*.scss',
          'app/templates/**/*.hbs', 
          'app/models/*.js', 
          'app/tests/**/*.js'
        ],
        tasks: ['jshint','ember_handlebars','concat','sass'],
        options: {
          debounceDelay:300
        }
      },
      images: {
        files: ['app/images/*'],
        tasks:['clean', 'copy'],
        options: {
          debounceDelay:300
        }
      }
    },
    qunit: {
      files: ['qunit/index.html']
    },
    connect: {
      debug: {
        options: {
          port:9090,
          base:'debug'
        }
      },
      release: {
        options: {
          port:9091,
          base:'release'
        }
      },
      test: {
        options: {
          port:9092,
          base:'qunit'
        }
      }
    },
    zip: {
      "release-pkg/release.zip" : ["release/**/*.*"]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-ember-handlebars');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-zip');
  grunt.registerTask('default', ['ember_handlebars','concat','sass','clean','copy','connect','watch']);
  grunt.registerTask('release', ['jshint','concat','uglify','cssmin','clean','copy']);
  grunt.registerTask('package_release',['release','zip']);
};
