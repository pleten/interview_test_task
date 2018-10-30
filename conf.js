const data_provider = require('./data_provider.js');


exports.config = {
    framework: 'jasmine',
    directConnect: true,
    specs: ['tests/*.js'],

    capabilities: {
        browserName: 'chrome',
    },

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
    },

    onPrepare: function() {
        beforeEach(function() {
            browser.ignoreSynchronization = true;
            browser.manage().deleteAllCookies();
            browser.manage().timeouts().implicitlyWait(15000);
            browser.manage().window().maximize();
            console.log(`Navigate to: '${data_provider.base_url}'`);
            browser.get(data_provider.base_url);
        });
    }
};