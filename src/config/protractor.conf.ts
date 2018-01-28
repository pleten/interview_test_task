import { browser, Config } from 'protractor'

const conf: Config = {
    baseUrl: 'https://ssls.com',

    capabilities: {
        browserName: 'chrome'
        // browserName: 'firefox'
    },
    specs: [
        '../specs/authorization/negative.spec.js',
        '../specs/authorization/positive.spec.js',
        '../specs/homepage/filters.spec.js',
        '../specs/profile/clientarea.spec.js'
    ],
    onPrepare: () => {
        /* const SpecReporter = require('jasmine-spec-reporter').SpecReporter
        jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
                displayDuration: true
            },
            summary: {
                displayStacktrace: true
            }
            
        })) */
        const AllureReporter = require('jasmine-allure-reporter')
        jasmine.getEnv().addReporter(new AllureReporter({
          resultsDir: 'allure-results'
        }))
    },
    framework: 'jasmine',
    allScriptsTimeout: 120 * 1000,
    directConnect: true,
    SELENIUM_PROMISE_MANAGER: false
}

exports.config = conf
