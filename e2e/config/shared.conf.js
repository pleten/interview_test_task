"use strict";

const config = require("./config");
const baseUrl = config.baseUrl;
const selenoidUrl = config.selenoidUrl;

module.exports = {
    directConnect: true,
    params: config,
    framework: "jasmine",

    allScriptsTimeout: 60000,

    baseUrl: baseUrl,

    onPrepare: function () {
        // link with video to each test in Selenoid
        afterEach(async function () {
            // eslint-disable-next-line no-undef
            allureCookies.addArgument('Video (only for remote run)', selenoidUrl + ':4444/video/' + await JSON.stringify((browser.getSession()).value_).replace(/"/g, '') + '.mp4');
        });
        require('jasmine-expect');
        let sharedOnPrepare = require('./onPrepare');
        return sharedOnPrepare();
    },

    jasmineNodeOpts: {
        showColors: true,
        isVerbose: true,
        includeStackTrace: true,
        defaultTimeoutInterval: 50000,
        print: function() {}  // required for jasmine-spec-reporter to work
    }
};
