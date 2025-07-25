module.exports = {
  testEnvironment: 'node',

  collectCoverage: true, 
  coverageDirectory: 'coverage', 
  collectCoverageFrom: [ 
    "apitests.test.js",
    "src/**/*.js" 
  ],
  coveragePathIgnorePatterns: [ 
    "/node_modules/"
  ],


  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: './junit-report',
      outputName: 'junit.xml',
      ancestorSeparator: ' › ',
      addFileAttribute: 'true',
    }],
    ['jest-html-reporters', {
      publicPath: './html-report',
      filename: 'report.html',
      expand: true,
      openReport: false
    }]
  ]
};