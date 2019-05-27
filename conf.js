exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['src/LoginPage.spec.js', 'src/MyProfile.spec.js','src/HomePage.spec.js'],
    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            'args': ['--start-maximized']
        },
    }
};
