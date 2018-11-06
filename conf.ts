exports.config = {
    specs: ['./src/specs/*.js'],
    baseUrl: 'https://www.ssls.com',
    directConnect: true,
    capabilities: {'browserName': 'firefox'},
    framework: 'jasmine'
};
