const { SpecReporter } = require('jasmine-spec-reporter');

const HtmlScreenshotReporter = require('./node_modules/protractor-jasmine2-screenshot-reporter');

const reporter = new HtmlScreenshotReporter({
    dest: 'target/screenshots',
    filename: 'Envision-Application-Protractor-Report.html'
});

exports.config = {
    baseUrl: 'https://www.ssls.com',

    capabilities: {
        browserName: 'chrome',
    },

    specs: './e2e/features/*.ts',

    framework: 'jasmine',
    allScriptsTimeout: 140000,
    getPageTimeout: 140000,
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 60000,
    },

    onPrepare: function () {
        require('ts-node').register({
            project: 'tsconfig.json'
        });
        const chai = require('chai');
        const chaiAsPromised = require('chai-as-promised');
        chai.use(chaiAsPromised);
        browser.manage().window().maximize();
        browser.waitForAngularEnabled(true);
        jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
        jasmine.getEnv().addReporter(reporter);
    },

    afterLaunch: function(exitCode) {
        return new Promise(function(resolve){
            reporter.afterLaunch(resolve.bind(this, exitCode));
        });
    },
};
