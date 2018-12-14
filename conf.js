// Whole-script strict mode syntax (ES6)
// "use strict";
const HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
const JUnitXmlReporter = require('protractor-html-reporter-2');

const env = require('./environment.js');
const _ = require('lodash');
const dateFormat = require('dateformat');
const SpecReporter = require('jasmine-spec-reporter');
// const loggerHelp = require('./common/helpers/logger_helpers.js');
//const webRep = require('./common/helpers/slack_reporter_helper.js');

exports.config = {

    SELENIUM_PROMISE_MANAGER: false,

    params: {},

    baseUrl: 'https://www.ssls.com/',

    framework: 'jasmine2',

    /**
     * ChromeDriver location is used to help find the chromedriver binary.
     * This will be passed to the Selenium jar as the system property
     * webdriver.chrome.driver. If null, Selenium will attempt to find
     * ChromeDriver using PATH.
     *
     * example:
     * chromeDriver: './node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_2.38'
     */
    chromeDriver: './node_modules/chromedriver/lib/chromedriver/chromedriver.exe',

    // ---- To connect directly to Drivers ------------------------------------
    /**
     * If true, Protractor will connect directly to the browser Drivers
     * at the locations specified by chromeDriver and firefoxPath. Only Chrome
     * and Firefox are supported for direct connect.
     *
     * default: false
     */
    directConnect: true,

    // ---- To connect to a Selenium Server which is already running ----------
    /**
     * The address of a running Selenium Server. If specified, Protractor will
     * connect to an already running instance of Selenium. This usually looks like
     * seleniumAddress: 'http://localhost:4444/wd/hub'
     */
    seleniumAddress: 'http://localhost:4444/wd/hub',

    suites: {
        full: [
            'specs/baseTest.js'
        ]
    },


    // If true, protractor will restart the browser between each test.
    // CAUTION: This will cause your tests to slow down drastically.
    restartBrowserBetweenTests: env.connections.browserOptions.restartBrowserBetweenTests,

    /**
     * If set, Protractor will ignore uncaught exceptions instead of exiting
     * without an error code. The exceptions will still be logged as warnings.
     */
    ignoreUncaughtExceptions: true,

    capabilities: {

        /**
         * If this is set to be true, specs will be sharded by file (i.e. all
         * files to be run by this set of capabilities will run in parallel).
         * Default is false.
         */
        shardTestFiles: env.connections.browserOptions.shardTestFiles,

        /**
         * Maximum number of browser instances that can run in parallel for this
         * set of capabilities. This is only needed if shardTestFiles is true.
         * Default is 1.
         */
        maxInstances: env.connections.browserOptions.maxInstances,

        browserName: 'chrome',

        acceptInsecureCerts: true,

        //Seting for selenoid if required
        enableVideo: true,

        enableVNC: true,

        videoName: `${dateFormat(Date.now(), "yyyy-mm-dd HH:MM:ss")}.mp4`,

        sessionTimeout: 180,

        chromeOptions: {

            perfLoggingPrefs: {
                'enableNetwork': true,
                'enablePage': false,
            },
            args: [

                '--disable-gpu',
                '--test-type',
                '--disable-extensions',
                '--enable-crash-reporter-for-testing',
                '--no-sandbox',
                '--disable-infobars'
            ],
            prefs: {
                'profile.password_manager_enabled': false,
                'credentials_enable_service': false,
                'password_manager_enabled': false,
                'unexpectedAlertBehaviour': 'ignore',

                /** Set download path and avoid prompting for download even though
                 this is already the default on Chrome but for completeness */

                'download': {
                    'prompt_for_download': false,
                    'directory_upgrade': true,
                    'default_directory': '/downloads'

                }
            }
        },

        loggingPrefs: {
            driver: 'ALL',
            browser: 'SEVERE',
            performance: 'ALL'
        }
    },

    allScriptsTimeout: 60 * 1000, // 1min, Default time to wait for any script.

    jasmineNodeOpts: {
        defaultTimeoutInterval: 15 * 60 * 1000, // 15min, Default time to wait before a test fails.
        showColors: true
    },

    onPrepare: function () {

        // /** Set size for window */
        // browser.driver.manage().window().setSize(
        //     env.connections.browserOptions.windowSize.width + 10, /* add std win walls */
        //     env.connections.browserOptions.windowSize.height + 93 /* add std win header */
        // );

        /** Add reporter to get name of spec and suite inside it
         *  Store data in jasmine container */
        let reporterCurrentSpec = {
            suiteStarted: (result) => {
                jasmine._currentSuiteName = result.description;
            },
            specStarted: (result) => {
                jasmine._currentSpecName = result.description;
            }
        };
        jasmine.getEnv().addReporter(reporterCurrentSpec);

        const xmlReport = new JUnitXmlReporter({
            consolidateAll: true,
            savePath: 'results/xml',
            filePrefix: 'xmlresults'
        });
        jasmine.getEnv().addReporter(xmlReport);

        const screenShotReporter = new HtmlScreenshotReporter({
            dest: 'results/screenshots',
            filename: 'my-report.html',
            reportOnlyFailedSpecs: false,
            captureOnlyFailedSpecs: true,
            showSummary: true,
            reportTitle: dateFormat(Date.now(), "yyyy-mm-dddd"),
        });

        jasmine.getEnv().addReporter(screenShotReporter);

        // add jasmine-spec-reporter
        jasmine.getEnv().addReporter(
            new SpecReporter({
                displayStacktrace: 'specs',    // display stacktrace for each failed assertion, values: (all|specs|summary|none)
                displayPendingSpec: true,    // display each pending spec
                displaySpecDuration: true,   // display each spec duration
                prefixes: {
                    success: '(v) ',
                    failure: '(x) ',
                    pending: '(*) '
                }
            })
        );
    }
};
