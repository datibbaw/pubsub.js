module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig(
  {
    pkg: grunt.file.readJSON('package.json'),
    
    jshint: 
    {
      options: 
      {
        laxcomma: true,
        smarttabs: true
      },
      all: ['src/**/*.js', 'tests/**/*.js']
    },

    qunit: 
    {
      all: ['tests/**/*.html']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('test_all', ['jshint', 'qunit']);
  grunt.registerTask('test', ['qunit']);
  grunt.registerTask('default', ['test']);
};
