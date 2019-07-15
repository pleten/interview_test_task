"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reporter = require("../support/reporter");

exports.sharedConfig = {
    SELENIUM_PROMISE_MANAGER: false,
    baseUrl: "https://ssls.com",

    params: {
        login: {
            user: "ssls.automation+5@gmail.com",
            password: "123456"
        },
        environment: 3,
    },

    restartBrowserBetweenTests: false,
    framework: "custom",
    frameworkPath: require.resolve("protractor-cucumber-framework"),

    specs: [
        "../features/**/meProfile.feature"
    ],
    beforeLaunch: () => {
        reporter.deleteDirectory();
        reporter.createDirectory();
    },
    onPrepare: () => {
        require('ts-node').register({
            project: require('path').join(__dirname, '../tsconfig.json')
        });
        browser.ignoreSynchronization = true;
        browser.manage().window().maximize();
    },
    afterLaunch: () => {
        reporter.createHTMLReport();
    },

    cucumberOpts: {
        compiler: "ts:ts-node/register",
        format: "json:./reports/json/cucumber_report.json",
        require: ["../stepDefinitions/*.ts", "../support/*.ts"],
        strict: true,
    }
};