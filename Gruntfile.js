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
      all: ['tests/qunit-test.html']
    },

    nodeunit: 
    {
      all: ['tests/nodeunit-tests.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('test', ['qunit', 'nodeunit']);
  grunt.registerTask('test_all', ['jshint', 'test']);
  grunt.registerTask('default', ['test']);
};
