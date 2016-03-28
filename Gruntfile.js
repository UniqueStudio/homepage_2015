module.exports = function(grunt) {
  var config = {
    app: 'app',
    dist: 'dist'
  };

  grunt.initConfig({
    config: config,
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        options:{
          report: "min",//输出压缩率，可选的值有 false(不输出信息)，gzip
          mangle: true //混淆
        },
        files: {
          '<%= config.dist %>/scripts/index.build.js': ['<%= config.app %>/scripts/index.build.js'],
          '<%= config.dist %>/scripts/head.build.js': ['<%= config.app %>/scripts/head.build.js']
        }
      }
    },
    imagemin: {                          // Task
      dynamic: {                         // Another target
        options: {                       // Target options
          optimizationLevel: 3,
          svgoPlugins: [{ removeViewBox: false }],
          //use: [mozjpeg()]
        },
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'dist/images',                   // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif,svg}'],   // Actual patterns to match
          dest: 'dist/images'                  // Destination path prefix
        }]
      }
    },
    htmlmin: {                                     // Task
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        /*
        files: {                                   // Dictionary of files
          'build/index.html': 'index.html',
          'build/static/views/*.html': '.tmp/static/views/*.html',
          {expand: true, cwd: 'dist/html', src: ['*.html'], dest: 'dist/html'}
        }
        */
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          src: '**/*.html',
          dest: '<%= config.dist %>'
        }]
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: [{
          expand: true,
          cwd: '<%= config.dist %>/styles',
          src: ['cssreset-min.css', 'index.css'],
          dest: '<%= config.dist %>/styles'
        }]
      }
    },
    'font-spider': {
      options: {},
      main: {
        src: './dist/**/*.html'
      }
    },
    copy: {
      dist: {
      files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            'images/{,*/}*.*',
            //'scripts/{,*/}*.js',
          //  'styles/index.css',
          '{,*/}*.html',
          'styles/fonts/{,*/}*.*'
          ]
        }]
      }
    },
    clean: {
      build: {
        src: "dist"
      }
    }
  });

  // 加载包含任务的插件。
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-font-spider');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // 默认被执行的任务列表。
  grunt.registerTask('default', ['clean', 'copy', 'uglify', 'htmlmin', /*'cssmin',*/ 'imagemin', 'font-spider']);

};
