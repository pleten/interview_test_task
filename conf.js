var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
var moment = require('moment');

exports.config = {
    directConnect: true,
    chromeOnly: true,
    framework: 'jasmine',
    params: require('./testdata.json'),
    specs: [
        './specs/authorization.spec.js'
        './specs/profile.spec.js'
        './specs/home.spec.js'
    ],
    jasmineNodeOpts: {
        defaultTimeoutInterval: 2500000,
        showColors: true
    },
    onPrepare: function() {
        beforeEach(function() {
            browser.manage().deleteAllCookies();
            browser.manage().window().maximize();
        })
        var ts_hms = moment().format('MMMM_Do_YYYY_h:mm:ss');
        jasmine.getEnv().addReporter(
            new Jasmine2HtmlReporter({
                savePath: './reports',
                filePrefix: ts_hms,
                takeScreenshotsOnlyOnFailures: true
            })
        )
    }
};
