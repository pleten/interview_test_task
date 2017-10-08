exports.config = {
    directConnect: true,
    chromeOnly: true,
    framework: 'jasmine',
    params: require('./testdata.json'),
    specs: [
        //'./specs/authorization.spec.js'
        './specs/profile.spec.js'
    ],
    jasmineNodeOpts: {
        defaultTimeoutInterval: 2500000,
        showColors: true
    },
    onPrepare: function() {
        browser.manage().window().maximize();
    }
};
