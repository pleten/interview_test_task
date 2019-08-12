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

    // helper require function to import api services
    global.requireApiServices = function (relativePath) {
        return require(__dirname + '/../../api/services/' + relativePath + '.service');
    };

    // helper require function to import helpers
    global.requireHelper = function (relativePath) {
        return require(__dirname + '/../helpers/' + relativePath + '.js');
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

    // write jUnit report
    let jasmineReporters = require('jasmine-reporters');

    browser.manage().window().setSize(1400, 900);
    browser.manage().window().maximize();

    // configure JUnit reporter
    let getProcessedConfig = browser.getProcessedConfig().then(function (config) {
        let reportPrefix = config.capabilities.name ? config.capabilities.name : "report";

        let junitReporter = new jasmineReporters.JUnitXmlReporter({
            consolidateAll: false,
            savePath: 'test-results',
            filePrefix: reportPrefix
        });
        jasmine.getEnv().addReporter(junitReporter);
    });

    // Allure reporter added via allureCookies to more comfortable work with attachments, description, etc
    // eslint-disable-next-line no-undef
    jasmine.getEnv().addReporter(allureCookies.getJasmineAllureReporter(
        {basePath: './', resultsDir: 'allure-results'}));

    return protractor.promise.all([
        getProcessedConfig
    ]);
};
