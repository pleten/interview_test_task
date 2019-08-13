/* eslint-disable angular/json-functions */
/* eslint-disable no-console */
"use strict";

const config = require('./shared.conf'),
selenoidUrl = require('./config').selenoidUrl;

config.directConnect = false;

// Selenoid UI 'selenoidUrl + :8080/#/'
config.seleniumAddress = selenoidUrl + ':4444/wd/hub';

config.capabilities = {
    browserName: 'chrome', // use the stable version (default for the installed Selenoid)
    chromeOptions: {
        args: ["disable-extensions"], //, "--headless", "--disable-gpu"
    },
    // the live observing during the test run
    enableVNC: true,
    // videos are available by the ':4444/video/' link
    enableVideo: true,
    // logs are available by the ':4444/logs/' link
    enableLog: false,
    screenResolution: "1920x1200x24",
    // for parallel runs
    shardTestFiles: true,
    maxInstances: 2,
};

config.specs = [
    "../specs/myProfile/myProfile.ClientArea.spec.js", // this test and 'myProfile.refreshSupportPin.spec' test cannot be run in parallel at the same time
    "../specs/authorization/*.spec.js",
    "../specs/logout/*.spec.js",
    "../specs/myProfile/myProfile.refreshSupportPin.spec.js", // this test and 'myProfile.ClientArea.spec' test cannot be run in parallel at the same time
    "../specs/home/*.spec.js"
];
config.exclude = [];

config.allScriptsTimeout = 120000;
config.jasmineNodeOpts.defaultTimeoutInterval = 120000;

config.onComplete = async function () {
    console.log('Video: ' + selenoidUrl + ':4444/video/' + await JSON.stringify((browser.getSession()).value_).replace(/"/g, '') + '.mp4');
    // console.log('Log: ' + selenoidUrl + ':4444/logs/' + await JSON.stringify((browser.getSession()).value_).replace(/"/g, '') + '.log')
};

exports.config = config;
