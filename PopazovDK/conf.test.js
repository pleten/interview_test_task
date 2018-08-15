let Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');


exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    framework: 'jasmine',
    allScriptsTimeout: 100000,
    jasmineNodeOpts: {
        defaultTimeoutInterval: 10000000
    },

    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            'prefs': {
                'credentials_enable_service': false,
                'profile': {
                    'password_manager_enabled': false
                }
            },
           'args': ['start-maximized']
        }

        //'browserName': 'internet explorer'
        //'browserName': 'firefox'
    },

    onPrepare: function() {
        jasmine.getEnv().addReporter(
            new Jasmine2HtmlReporter({
                takeScreenshots: true,
                takeScreenshotsOnlyOnFailures: true,
                consolidate: true,
                consolidateAll: true,
                savePath: 'reports/'
            })
        );
        //
        // jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
        //     consolidate: true,
        //     consolidateAll: true,
        //     savePath: 'junitreports',
        //     filePrefix: 'xmloutput'
        // }));
    },
    specs: [
        'Specs/**/*.js'

    ],
    baseUrl: 'https://www.ssls.com/',

    params : {
        testUserLogin: 'ssls.automation+5@gmail.com',
        testUserPassword: '123456',
        elementDefaultWaitTime: 5000,
        authorizePageUrl: "authorize",
        profilePageUrl: "user/profile"
    }
};