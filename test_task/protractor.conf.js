const Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
const specReporter = require('jasmine-spec-reporter');


exports.config = {
    seleniumServerJar: './selenium-server-standalone-3.8.0.jar',
    baseUrl: 'https://ssls.com',
    capabilities: {
        browserName: 'chrome'
    },
    framework: 'jasmine',
    suites: {
        login_test: ['./test/login/login_test.spec.js'],
        profile_test: ['./test/profile/profile_test.spec.js'],
        filters_test: ['./test/filters/filter_test.spec.js']
    },
    allScriptsTimeout: 30000,
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        isVerbose: true
    },
    onPrepare: function() {
        browser.driver.manage().window().setSize(1440, 900);
        browser.ignoreSynchronization = false;

        jasmine.getEnv().addReporter(new specReporter());
        jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
            savePath: './reports',
            screenshotsFolder: 'images',
            takeScreenshotsOnlyOnFailures: true
        }));
    }
};
