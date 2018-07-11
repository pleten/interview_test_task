declare const allure: any;

import {browser, Config} from 'protractor';
import {SpecReporter} from "jasmine-spec-reporter";

export let conf: Config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    baseUrl: 'https://ssls.com',
    allScriptsTimeout: 30000,
    getPageTimeout: 30000,
    capabilities: {
        browserName: 'chrome',
        'chromeOptions': {
            args: ['--disable-web-security', '--incognito', '--window-size=2000,2000']
        },
        shardTestFiles: true,
        maxInstances: 2,
        enableVNC: true
    },
    framework: 'jasmine2',
    jasmineNodeOpts: {
        defaultTimeoutInterval: 90000,
        print: () => {}
    },
    suites: {
        'profile-page': './../specs/profile-page.spec.js',
        'smoke': './../specs/smoke.spec.js'
    },

    onPrepare: () => {
        let AllureReporter = require('jasmine-allure-reporter');
        jasmine.getEnv().addReporter(new AllureReporter());
        jasmine.getEnv().afterEach(function(done){
            browser.takeScreenshot().then(function (png) {
                allure.createAttachment('Screenshot', function () {
                    return new Buffer(png, 'base64')
                }, 'image/png')();
                done();
            })
        });

        jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
                displayStacktrace: true
            }
        }));
    },

    onComplete: (async () => {
        await browser.close();
    })
};

exports.config = conf;
