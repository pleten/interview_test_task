const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const DescribeFailureReporter = require('protractor-stop-describe-on-failure');
const HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

const specReporter = new SpecReporter({
    displayStacktrace: 'all',       // display stacktrace for each failed assertion, values: (all|specs|summary|none)
    displayFailuresSummary: false,  // display summary of all failures after execution
    displayPendingSummary: false,   // display summary of all pending specs after execution
    displaySuccessfulSpec: false,   // display each successful spec
    displayFailedSpec: true,        // display each failed spec
    displayPendingSpec: false,      // display each pending spec
    displaySpecDuration: true,      // display each spec duration
    displaySuiteNumber: true,       // display each suite number (hierarchical)
    colors: {
        success: 'green',
        failure: 'red',
        pending: 'blue'
    },
    prefixes: {
        success: '✓ ',
        failure: '✗ ',
        pending: '* '
    },
    customProcessors: []
});

const htmlReporter = new HtmlScreenshotReporter({
    dest: './reports/html_report/',
    filename: 'FullReport.html',
    ignoreSkippedSpecs: true,
    reportOnlyFailedSpecs: false,
    captureOnlyFailedSpecs: true,
    showSummary: true,
    showQuickLinks: true,
    inlineImages: true
});

exports.config = {

    directConnect: true,

    capabilities: {
            'browserName': 'chrome',
        'chromeOptions': {
            args: ['--disable-extensions', '--disable-infobars', '--incognito', '--test-type=browser', '--start-maximized']
        }
    },

    plugins: [{
        package: 'protractor-testability-plugin',
        path: '../node_modules/protractor-testability-plugin'
    }, {
        package: 'protractor-console',
        logLevels: ['severe'],
        path: '../node_modules/protractor-console'
    }],

    frameworks: [
        'jasmine',
        'jasmine-matchers'
    ],

    suites: {
        test: [
            './test/authorization/authorization.spec.js',
            './test/profile_page/profile_page.spec.js',
            './test/home_page/home_page.spec.js'
        ]
    },

    allScriptsTimeout: 20000,

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 20000,
        isVerbose: true
    },

    beforeLaunch: function() {
        return new Promise(function(resolve){
            htmlReporter.beforeLaunch(resolve);
        });
    },

    onPrepare: function() {
        browser.ignoreSynchronization = true;

        jasmine.getEnv().addReporter(htmlReporter);
        jasmine.getEnv().addReporter(specReporter);
        jasmine.getEnv().addReporter(DescribeFailureReporter(jasmine.getEnv()));
    },

    afterLaunch: function(exitCode) {
        return new Promise(function(resolve){
            htmlReporter.afterLaunch(resolve.bind(this, exitCode));
        });
    }
};
