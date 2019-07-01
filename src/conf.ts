import {browser, Config} from "protractor";
import {initCustomJasmineMatchers} from "./utils/custom-jasmine-matchers";
import {initReporters} from "./utils/reporters";
import {URLS} from "./assets";

export const config: Config = {
    framework: "jasmine2",

    capabilities: {
        browserName: process.env.BROWSER_NAME && process.env.BROWSER_NAME.trim() || "chrome",
        shardTestFiles: !!process.env.PARALLEL,
        maxInstances: 3
    },

    directConnect: true,

    allScriptsTimeout: 20000,

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 20000,
        // tslint:disable-next-line:no-empty
        print: () => {}
    },

    SELENIUM_PROMISE_MANAGER: false,

    onPrepare() {
        initReporters();
        initCustomJasmineMatchers();

        browser.baseUrl = URLS.BASE;
        browser.manage().window().maximize();
    },

    specs: ["specs/*.js"]
};
