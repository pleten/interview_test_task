let SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    allScriptsTimeout: 150000,
    maxSessions: 1,

    params: {
        login: {
            email: 'ssls.automation+5@gmail.com',
            password: '123456'
        }
    },

    capabilities: {
        'browserName': 'chrome'
    },

    framework: 'jasmine',

    specs: ['Tests/AuthorizationTests.js'],

    jasmineNodeOpts: {
        defaultTimeoutInterval: 1000000
    },

    onPrepare: function() {
        jasmine.getEnv().addReporter(new SpecReporter({
            suite: {
                displayNumber: true,
            },
            spec: {
                displayPending: true,
                displayDuration: true,
            },
            summary: {
                displaySuccesses: false,
                displayFailed: false,
                displayPending: false,
            }
        }));

        baseUrl: '';
        browser.manage().window().setSize(1920, 1080);
    }
};