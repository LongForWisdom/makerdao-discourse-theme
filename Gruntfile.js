module.exports = function(grunt) {
  'use strict'

  require('load-grunt-tasks')(grunt)
  require('time-grunt')(grunt)

  grunt.loadNpmTasks('grunt-contrib-watch');

  // project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      css: {
        files: ['./scss/*.scss'],
        tasks: [
          'scsslint:project', 
          'sass:common',
          'sass:desktop',
          'sass:mobile', 
          'concat:common',
          'concat:desktop',
          'concat:mobile', 
          'postcss:common',
          'postcss:desktop',
          'postcss:mobile', 
        ]
      },
      css: {
        files: ['./scss/mixins/*.scss'],
        tasks: [
          'scsslint:project', 
          'sass:common',
          'sass:desktop',
          'sass:mobile', 
          'concat:common',
          'concat:desktop',
          'concat:mobile', 
          'postcss:common',
          'postcss:desktop',
          'postcss:mobile', 
        ]
      },
      css: {
        files: ['./scss/common/*.scss'],
        tasks: [
          'scsslint:project', 
          'sass:common', 
          'concat:common',
          'postcss:common'
        ]
      },
      css: {
        files: ['./scss/desktop/*.scss'],
        tasks: [
          'scsslint:project',
          'sass:desktop',
          'concat:desktop', 
          'postcss:desktop'
        ]
      },
      css: {
        files: ['./scss/mobile/*.scss'],
        tasks: [
          'scsslint:project', 
          'sass:mobile', 
          'concat:mobile',
          'postcss:mobile'
        ]
      }
    },

    concat: {
      options: {
        banner: '@function brightness($color) {\n' +
                '  @return ((red($color) * .299) + (green($color) * .587) + (blue($color) * .114));\n' +
                '}\n' +
                '\n' +
                '@function color-chooser($dark, $light) {\n' +
                '  @if brightness($primary) > brightness($secondary) {\n' +
                '    @return $dark;\n' +
                '  } @else {\n' +
                '    @return $light;\n' +
                '  }\n' +
                '}\n' +
                '\n' +
                '@function color-dynamic($color) {\n' +
                '  @if lightness($color) > 75 {\n' +
                '    @return $primary;\n' +
                '  } @else {\n' +
                '    @return #ffffff;\n' +
                '  }\n' +
                '}\n' +
                '\n'
      },
      common: {
        dest: 'theme/common/common.scss',
        src: '<%= sass.common.dest %>'
      },
      desktop: {
        dest: 'theme/desktop/desktop.scss',
        src: '<%= sass.desktop.dest %>'
      },
      mobile: {
        dest: 'theme/mobile/mobile.scss',
        src: '<%= sass.mobile.dest %>'
      }
    },

    postcss: {
      options: {
        map: false,
        processors: [
          require('autoprefixer')({
            browsers: [
              '>= 1%',
              'last 1 major version',
              'not dead',
              'Android >= 4.4',
              'Chrome >= 45',
              'Edge >= 12',
              'Explorer >= 10',
              'Firefox >= 38',
              'iOS >= 9',
              'Opera >= 30',
              'Safari >= 9'
            ]
          })
        ]
      },
      common: {
        src: 'theme/common/common.scss'
      },
      desktop: {
        src: 'theme/desktop/desktop.scss'
      },
      mobile: {
        src: 'theme/mobile/mobile.scss'
      }
    },

    sass: {
      options: {
        precision: 6,
        sourcemap: 'none',
        style: 'expanded'
      },
      common: {
        dest: 'theme/common/common.scss',
        src: 'scss/common.scss'
      },
      desktop: {
        dest: 'theme/desktop/desktop.scss',
        src: 'scss/desktop.scss'
      },
      mobile: {
        dest: 'theme/mobile/mobile.scss',
        src: 'scss/mobile.scss'
      }
    },

    scsslint: {
      options: {
        config: 'scss/.scss-lint.yml'
      },
      project: ['scss/**/*.scss']
    },

    // update package.json packages
    devUpdate: {
      default: {
        options: {
          semver: false,
          updateType: 'prompt'
        }
      }
    }
  })

  // task registration
  grunt.registerTask(
    'default',
    [
      'scsslint',
      'sass',
      'concat',
      'postcss'
    ]
  )
}
