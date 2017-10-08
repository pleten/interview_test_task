exports.config = {
    directConnect: true,
    chromeOnly: true,
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub'
    specs: [
        'authorization.spec.js',
        'logout.spec.js',
        'profile.spec.js'
    ],
    jasmineNodeOpts: {
        defaultTimeoutInterval: 2500000,
        showColors: true
    },
    capabilities: {
        'browserName': 'chrome'
    }
    params: require('./testdata.json'),
    onPrepare: function() {
        browser.manage().window().maximize();
    }
};
