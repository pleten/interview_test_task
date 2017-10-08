let SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    allScriptsTimeout: 150000,
    maxSessions: 1,

    capabilities: {
        browserName: 'chrome',

        chromeOptions: {
            args: ["--headless", "--disable-gpu", "--window-size=800,600"]
        }
    },

    framework: 'jasmine',

    specs: ['Tests/AuthorizationTests.js', 'Tests/GeneralTests.js', 'Tests/ProfileTests.js', 'Tests/HomeTests.js'],

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