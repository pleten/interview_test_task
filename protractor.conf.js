/**
 * Created by vbu on 2/15/17.
 */
var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var SSReporter = require('protractor-jasmine2-screenshot-reporter');

var config = {
    DEFAULT_WIDTH: 1280,
    DEFAULT_HEIGHT: 1024,
    resultFolder : 'test-result'
};

var screenshotReporter = new SSReporter ({
    dest: config.resultFolder + '/screenshots',
    pathBuilder: function(currentSpec) {
        var name = currentSpec.fullName,
            testname = name.replace(/\s+/g, '-').toLowerCase();
        return testname;
    },
    filename: 'index.html',
    reportTitle: 'E2E Tests Report'
});

exports.config = {
    allScriptsTimeout: 120000,
    getPageTimeout: 80000,
    specs: [
        './specs/*.spec.js'
    ],
    suites: {
        profile: 'specs/profile.spec.js',
        auth: 'specs/authorize.spec.js'
    },
    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            'args': ['--test-type', '--no-sandbox']
        }
    },

    rootElement: '*[ng-app]',

    baseUrl: 'https://ssls.com/',

    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        showTiming: true,
        defaultTimeoutInterval: 100000,
        print: function() {}
    },

    params: {
        email: 'ssls.automation+4@gmail.com',
        password: '123456'
    },

    beforeLaunch: function() {
        return new Promise(function(resolve){
            screenshotReporter.beforeLaunch(resolve);
        });
    },

    afterLaunch: function(exitCode) {
        return new Promise(function(resolve){
            screenshotReporter.afterLaunch(resolve.bind(this, exitCode));
        });
    },

    onPrepare: function() {
        global.BROWSER_WAIT = 5000;
        global.EC = ExpectedConditions;
        global.helpers = require('protractor-helpers');

        require('./utils/customLocators');
        require('jasmine-expect');

        jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'specs', displaySpecDuration: true}));
        jasmine.getEnv().addReporter(screenshotReporter);

        helpers.maximizeWindow(config.DEFAULT_WIDTH, config.DEFAULT_HEIGHT);
        // go to home page
        browser.get('');
    }
};