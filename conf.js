/**
 * Created by QA on 21.03.2017.
 */

exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['specs/**/*.spec.js'],
    capabilities: {
        browserName: 'chrome'
    },
      jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }
}


