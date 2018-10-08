exports.config = {
    allScriptsTimeout: 21000,
    directConnect: true,
    framework: 'jasmine',

    seleniumAddress: 'http://localhost:4444/wd/hub',

    specs: [
        'e2e/tests/authorization/welcome_back.js',
        'e2e/tests/authorization/not_registered_user.js',
        'e2e/tests/authorization/invalid_email.js',
        'e2e/tests/authorization/empty_fields.js',
        'e2e/tests/authorization/​log_Out.js',
        'e2e/tests/authorization/client_area.js',
        'e2e/tests/authorization/refresh_support_pin.js',
        'e2e/tests/authorization/filters.js'
    ],

    baseUrl: 'https://www.ssls.com/',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000,
        showColors: true,
    }
};