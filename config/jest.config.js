// jest.config.js
module.exports = {
  // Clear mocks before each test to ensure test isolation
  clearMocks: true,

  // Display name for the test suite (optional, but good for reporting)
  displayName: {
    name: 'GoRest API Tests',
    color: 'blue',
  },

  // Verbose output for more detailed test results
  verbose: true,

  // Run tests in a Node.js environment
  testEnvironment: 'node',

  // Globals available in test files (e.g., environment variables)
  globals: {
    // You can add global variables here if needed
  },

  // Setup files to run before tests (e.g., environment variable loading)
  setupFiles: [
    '<rootDir>/.env/qa.environment.js' // Loads our QA environment variables
  ],

  // Configuration for test result reporters
  reporters: [
    'default', // Default console reporter
    [
      'jest-html-reporters', // HTML report generation
      {
        publicPath: './test-reports/html', // Directory to save HTML reports
        pageTitle: 'GoRest API Automation Results', // Title of the HTML report page
        filename: 'index.html', // Name of the HTML report file
        expand: false, // Expand all test suites by default
        openReport: true, // Do not open report automatically after run
        includeConsoleLog: true, // Include console logs in the report
        inlineSource: true,
        stripSkippedTest: false,
        enableMergeData: false,
        //dataMergeLevel: 0,
        hideIcon: false,
        logoImgPath: "temp/kudaImage.png",
      },
    ],
    [
      'jest-junit', // JUnit XML report generation (for CI/CD)
      {
        outputDirectory: './test-reports/junit', // Directory to save JUnit XML reports
        outputName: 'junit.xml', // Name of the JUnit XML report file
        suiteName: 'GoRest API Test Suite', // Name of the test suite
      },
    ],
  ],

  // Patterns to find test files
  testMatch: [
    '<rootDir>/src/__tests__/**/*.test.js', // Finds all .test.js files in src/__tests__
  ],

  // Directories to ignore during test discovery
  testPathIgnorePatterns: [
    '\\\\node_modules\\\\', // Ignore node_modules
  ],

  // Transform files with Babel before running tests
  transform: {
    '^.+\\.js$': 'babel-jest', // Use babel-jest for .js files
  },

  rootDir: "../", // "../" means: Go one folder up from the location of the Jest config file.
                  // It means Jest will look for test files starting from the project root (axios-api-automation-ii/), not inside config/.
};