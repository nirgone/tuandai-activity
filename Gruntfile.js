
//Creating on 2016/2/20 by simona
'use strict';

module.exports = function(grunt) {
	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Automatically load required grunt tasks
	require('jit-grunt')(grunt, {
		useminPrepare: 'grunt-usemin'
	});

	// Configurable paths
	var config = {
		activity: 'activity',
		actName: 'cardGame',
		dist: 'dist'
	};

	// Define the configuration for all the tasks
	grunt.initConfig({
		// Project settings
		config: config,
		// page
		pkg: grunt.file.readJSON('package.json'),

		// Compiles Sass to CSS and generates necessary files if requested
		sass: {
			options: {
				sourceMap: true,
				sourceMapEmbed: true,
				sourceMapContents: true,
				includePaths: ['.']
			},
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.activity %>/<%= config.actName %>/sass',
					src: ['*.{scss,sass}'],
					dest: '<%= config.activity %>/<%= config.actName %>/.tmp/css',
					ext: '.css'
				}]
			}
		},

		postcss: {
			options: {
				map: true,
				processors: [
					// Add vendor prefixed styles
					require('autoprefixer')({
						browsers: ['Android > 20', 'iOS 5', 'Chrome > 5%', 'Safari > 5%']
					})
				]
			},
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.activity %>/<%= config.actName %>/.tmp/css/',
					src: '{,*/}*.css',
					dest: '<%= config.activity %>/<%= config.actName %>/.tmp/css/'
				}]
			}
		},

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			// bower: {
			// 	files: ['bower.json'],
			// 	tasks: ['wiredep']
			// },
			// babel: {
			// 	files: ['<%= config.app %>/scripts/{,*/}*.js'],
			// 	tasks: ['babel:dist']
			// },
			gruntfile: {
				files: ['Gruntfile.js']
			},
			sass: {
				files: ['<%= config.activity %>/<%= config.actName %>/sass/{,*/}*.{scss,sass}', './sass/{,*/}*.{scss,sass}'],
				tasks: ['sass', 'postcss']
			},
			styles: {
				files: ['<%= config.activity %>/<%= config.actName %>/css/{,*/}*.css'],
				tasks: ['postcss']
			},
			js: {
				files: ['<%= config.activity %>/<%= config.actName %>/js/{,*/}*.js'],
			},
			html: {
				files: ['<%= config.activity %>/<%= config.actName %>/html/{,*/}*.html'],
			}
		},

		browserSync: {
			options: {
				notify: false,
				background: true,
				watchOptions: {
					ignored: ''
				}
			},
			livereload: {
				options: {
					files: [
						'<%= config.activity %>/<%= config.actName %>/html/{,*/}*.html',
						'<%= config.activity %>/<%= config.actName %>/.tmp/css/{,*/}*.css',
						'<%= config.activity %>/<%= config.actName %>/images/{,*/}*',
						'<%= config.activity %>/<%= config.actName %>/.tmp/js/{,*/}*.js',
						'<%= config.activity %>/<%= config.actName %>/js/{,*/}*.js'
					],
					port: 9090,
					server: {
						baseDir: ['<%= config.activity %>/<%= config.actName %>/.tmp', '<%= config.activity %>/<%= config.actName %>'],
						// routes: {
						// 	'/bower_components': './bower_components'
						// }
					}
				}
			},
			test: {
				options: {
					port: 9001,
					open: false,
					logLevel: 'silent',
					host: 'localhost',
					server: {
						baseDir: ['<%= config.activity %>/<%= config.actName %>/.tmp', './test', './'],
						// routes: {
						// 	'/bower_components': './bower_components'
						// }
					}
				}
			},
			dist: {
				options: {
					background: false,
					server: '<%= config.activity %>/<%= config.actName %>/<%= config.dist %>'
				}
			}
		},

		// Empties folders to start fresh
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'<%= config.activity %>/<%= config.actName %>/.tmp',
						'<%= config.activity %>/<%= config.actName %>/<%= config.dist %>/*',
						'!<%= config.activity %>/<%= config.actName %>/<%= config.dist %>/.git*'
					]
				}]
			},
			// server: '.tmp'
			server: {
				files: [{
					dot: true,
					src: [
						'<%= config.activity %>/<%= config.actName %>/.tmp',
					]
				}]
			}
		},

		// Make sure code styles are up to par and there are no obvious mistakes
		// eslint: {
		// 	target: [
		// 		'Gruntfile.js',
		// 		'lib/{,*/}*.js',
		// 		'<%= config.activity %>/<%= config.actName %>/js/{,*/}*.js',
		// 		'test/spec/{,*/}*.js'
		// 	]
		// },

		// Compiles ES6 with Babel
		babel: {
			options: {
				sourceMap: true,
				presets: ['es2015']
			},
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.activity %>/<%= config.actName %>/js',
					src: '{,*/}*.js',
					dest: '<%= config.activity %>/<%= config.actName %>/.tmp/js',
					ext: '.js'
				}]
			},
			// test: {
			// 	files: [{
			// 		expand: true,
			// 		cwd: 'test/spec',
			// 		src: '{,*/}*.js',
			// 		dest: '.tmp/spec',
			// 		ext: '.js'
			// 	}]
			// }
		},

		// Renames files for browser caching purposes
		filerev: {
			dist: {
				src: [
					'<%= config.activity %>/<%= config.actName %>/<%= config.dist %>/js/{,*/}*.js',
					'<%= config.activity %>/<%= config.actName %>/<%= config.dist %>/css/{,*/}*.css',
					'<%= config.activity %>/<%= config.actName %>/<%= config.dist %>/images/{,*/}*.*',
				]
			}
		},

		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		useminPrepare: {
			options: {
				dest: '<%= config.activity %>/<%= config.actName %>/<%= config.dist %>'
			},
			html: ['<%= config.activity %>/<%= config.actName %>/html/index.html']
		},

		// Performs rewrites based on rev and the useminPrepare configuration
		usemin: {
			options: {
				assetsDirs: [
					'<%= config.activity %>/<%= config.actName %>/<%= config.dist %>',
					'<%= config.activity %>/<%= config.actName %>/<%= config.dist %>/images',
					'<%= config.activity %>/<%= config.actName %>/<%= config.dist %>/css'
				]
			},
			html: ['<%= config.activity %>/<%= config.actName %>/<%= config.dist %>/{,*/}*.html'],
			css: ['<%= config.activity %>/<%= config.actName %>/<%= config.dist %>/css/{,*/}*.css']
		},

		// The following *-min tasks produce minified files in the dist folder
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.activity %>/<%= config.actName %>/images',
					src: '{,*/}*.{gif,jpeg,jpg,png}',
					dest: '<%= config.activity %>/<%= config.actName %>/<%= config.dist %>/images'
				}]
			}
		},

		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.activity %>/<%= config.actName %>/images',
					src: '{,*/}*.svg',
					dest: '<%= config.activity %>/<%= config.actName %>/<%= config.dist %>/images'
				}]
			}
		},

		htmlmin: {
			dist: {
				options: {
					collapseBooleanAttributes: true,
					collapseWhitespace: true,
					conservativeCollapse: true,
					removeAttributeQuotes: true,
					removeCommentsFromCDATA: true,
					removeEmptyAttributes: true,
					removeOptionalTags: true,
					// true would impact styles with attribute selectors
					removeRedundantAttributes: false,
					useShortDoctype: true
				},
				files: [{
					expand: true,
					cwd: '<%= config.activity %>/<%= config.actName %>/<%= config.dist %>',
					src: '{,*/}*.html',
					dest: '<%= config.activity %>/<%= config.actName %>/<%= config.dist %>'
				}]
			}
		},
		// Copies remaining files to places other tasks can use
		copy: {
			server: {
				files: [{
					expand: true,
					dot: true,
					cwd: './lib',
					dest: '<%= config.activity %>/<%= config.actName %>/.tmp/js',
					src: [
						'{,*/,*/*/}*.js',
					]
				}, {
					expand: true,
					dot: true,
					cwd: './lib',
					dest: '<%= config.activity %>/<%= config.actName %>/.tmp/css',
					src: [
						'{,*/,*/*/}*.css',
					]
				}]
			},
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= config.activity %>/<%= config.actName %>/',
					dest: '<%= config.activity %>/<%= config.actName %>/<%= config.dist %>',
					src: [
						'images/{,*/}*.webp',
						'{,*/}*.js',
						'fonts/{,*/}*.*',
						'music/*.*',
					]
				}, {
					expand: true,
					dot: true,
					cwd: '<%= config.activity %>/<%= config.actName %>',
					dest: '<%= config.activity %>/<%= config.actName %>/<%= config.dist %>',
					src: '{,*/}*.html',
				}, {
					expand: true,
					dot: true,
					cwd: './lib/vendor',
					dest: '<%= config.activity %>/<%= config.actName %>/<%= config.dist %>/js/lib/vendor',
					src: '{,*/}*.css',
				}]
			}
		},
		cssmin: {
			dist: {
				files: {
					'<%= config.activity %>/<%= config.actName %>/<%= config.dist %>/css/main.css': [
						'<%= config.activity %>/<%= config.actName %>/.tmp/css/{,*/}*.css',
						'<%= config.activity %>/<%= config.actName %>/css/{,*/}*.css'
					]
				}
			}
		},

		// Run some tasks in parallel to speed up build process
		concurrent: {
			server: [
				// 'babel:dist',
				'sass',
				'copy:server'
			],
			test: [
				// 'babel'
			],
			dist: [
				// 'babel',
				'sass',
				'imagemin',
				'svgmin'
			]
		},

		// concat: {
		// 	options: {
		// 		separator: ';',
		// 		stripBanners: true
		// 	},
		// 	dist: {
		// 	  src: [
		// 	    "./lib/vendor/jquery.min.js",
		// 	    "./lib/vendor/fastclick.js",
		// 	    // "js/index.js",
		// 	  ],
		// 	  dest: "./lib/fastclick-jquery.js"
		// 	}
		// },
		uglify: {
			options: {},
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: './lib',
					dest: '<%= config.activity %>/<%= config.actName %>/<%= config.dist %>/js/lib',
					src: '{,*/,*/*/}*.js',
				}]
			},
		},


	});

	grunt.registerTask('serve', 'start the server and preview your app', function(target) {
		// if(projectname) {
		// 	config.actName = projectname;
		// }

		if (target === 'dist') {
			return grunt.task.run(['build', 'browserSync:dist']);
		}

		grunt.task.run([
			'clean:server',
			// 'wiredep',
			'concurrent:server',
			'postcss',
			'browserSync:livereload',
			'watch'
		]);
	});

	grunt.registerTask('server', function(target) {
		grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
		grunt.task.run([target ? ('serve:' + target) : 'serve']);
	});

	grunt.registerTask('build', [
		'clean:dist',
		// 'wiredep',
		'concurrent:dist',
		'useminPrepare',
		'postcss',
		'cssmin:dist',
		// 'concat',
		'uglify',
		'copy:dist',
		// 'modernizr',
		// 'filerev',
		'usemin',
		// 'htmlmin'
	]);

	grunt.registerTask('default', [
		'newer:eslint',
		'test',
		'build'
	]);

};