/* eslint-disable no-underscore-dangle,camelcase,no-console */
"use strict";

module.exports = function () {
    const SpecReporter = require('jasmine-spec-reporter');

    // making helpers globally available
    global.helpers = require("./../helpers/helpers");

    // helper require function to import page objects
    global.requirePO = function (relativePath) {
        return require(__dirname + '/../po/' + relativePath + '.po');
    };

    global.using = require('jasmine-data-provider');
    
    global.allureCookies = require('allure-cookies');

    require("jasmine-expect");
    require("../helpers/jasmine-custom-matchers");

    global.EC = protractor.ExpectedConditions;

    // determine the platform and decide on a control key
    browser.controlKey = protractor.Key.CONTROL;
    browser.getCapabilities().then(function (caps) {
        let platform = caps.get('platform');
        let isMac = platform === "Darwin" || platform === "Mac OS X";

        if (isMac) { // if Mac
            browser.controlKey = protractor.Key.COMMAND;
        }
    });

    // jasmine spec reporter
    jasmine.getEnv().addReporter(new SpecReporter({
        displayStacktrace: 'specs',
        displayPendingSpec: true,
        displaySpecDuration: true,
        displaySuccessesSummary: false,
        displayFailuresSummary: false,
        displayPendingSummary: false
    }));

    browser.manage().window().setSize(1300, 800);
    browser.manage().window().maximize();

    // Allure reporter added via allureCookies to more comfortable work with attachments, description, etc
    // eslint-disable-next-line no-undef
    jasmine.getEnv().addReporter(allureCookies.getJasmineAllureReporter(
        {basePath: './', resultsDir: 'allure-results'}));
};
