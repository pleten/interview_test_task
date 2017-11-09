let SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
    directConnect: true,

    capabilities: {
        browserName: 'chrome',

        chromeOptions: {
            args: ["--headless", "--disable-gpu"]
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

        browser.manage().window().setSize(1920, 1080);
    }
};