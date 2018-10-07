exports.config = {

    seleniumAddress: 'http://localhost:4444/wd/hub',

    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: [
                '--start-maximized'
            ]
        },
        getPageTimeout: 30000,
        allScriptsTimeout: 30000
    },

    suites: {
        login: './scenarios/login-spec.js',
        header: './scenarios/header-spec.js',
        profile: './scenarios/profile-spec.js',
        home: './scenarios/home-spec.js'
    }
};