exports.config = {
    specs: [
        'test_cases/*.spec.js'
    ],
    capabilities: {
        browserName: 'chrome'
    },
    baseUrl: 'https://ssls.com',
    framework: 'jasmine',
    params: {
        login: {
            email: 'ssls.automation+5@gmail.com',
            password: '123456'
        }
    },
};