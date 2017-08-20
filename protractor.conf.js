/*global jasmine */
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
    multiCapabilities: [{
        'browserName': 'chrome'
    }],
    allScriptsTimeout: 600000,
    getPageTimeout: 120000,
    specs: [
        './e2e/**/*.e2e-spec.ts'
    ],
    directConnect: true,
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 500000,
        print: function () {
        }
    },

    onPrepare: function () {
        require('ts-node').register({
            project: 'e2e'
        });
        browser.driver.manage().window().maximize();
        browser.waitForAngularEnabled(true);
        jasmine.getEnv().addReporter(new SpecReporter({spec: {displayStacktrace: true}}));
    }
};
