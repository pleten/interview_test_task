// Whole-script strict mode syntax (ES6)
// "use strict";

const env = require('./environment.js');
const _ = require('lodash');
const dateFormat = require('dateformat');
const SpecReporter = require('jasmine-spec-reporter');
// const loggerHelp = require('./common/helpers/logger_helpers.js');
//const webRep = require('./common/helpers/slack_reporter_helper.js');

exports.config = {

    // It is an arbitrary
    // object and can contain anything you may need in your test.
    // This can be changed via the command line as:
    //   --params.login.user "Joe"
    // Can be accessed from your test as browser.params.
    params: {},

    //useAllAngular2AppRoots: true, //only for Angular 2 apps

    baseUrl: 'https://www.ssls.com/',
    framework: 'jasmine2',

    // ---- To start a standalone Selenium Server locally ---------------------
    /**
     * The location of the standalone Selenium Server jar file, relative
     * to the location of webdriver-manager. If no other method of starting
     * Selenium Server is found, this will default to
     * node_modules/protractor/node_modules/webdriver-manager/selenium/<jar file>
     */
    // seleniumServerJar: (() => {
    //     let jarFilePath = glob.sync(`node_modules/protractor/node_modules/webdriver-manager/` +
    //         `selenium/selenium-server-standalone*.jar`)[0];
    //     return jarFilePath;
    // })(),
    /**
     * The timeout milliseconds waiting for a local standalone Selenium Server to start.
     * default: 30000ms
     */
    //seleniumServerStartTimeout: 30 * 1000,
    /**
     * Can be an object which will be passed to the SeleniumServer class as args.
     * See a full list of options at
     * https://github.com/SeleniumHQ/selenium/blob/master/javascript/node/selenium-webdriver/remote/index.js
     * If you specify `args` or `port` in this object, it will overwrite the
     * values set via the deprecated config values `seleniumPort` and
     * `seleniumArgs`.
     */
    localSeleniumStandaloneOpts: {
        /**
         * The port to start the Selenium Server on, or null if the server should
         * find its own unused port.
         */
        port: null,
        /**
         * Additional command line options to pass to selenium. For example,
         * if you need to change the browser timeout, use
         * seleniumArgs: ['-browserTimeout=60']
         */
        args: [],

        /**
         * Additional command line jvm options to pass to selenium. For example,
         * if you need to change the browser driver, use
         * jvmArgs: ['-Dwebdriver.ie.driver=IEDriverServer_Win32_2.53.1.exe']
         */
        jvmArgs: ['-Xmx1024m'],
    },

    /**
     * ChromeDriver location is used to help find the chromedriver binary.
     * This will be passed to the Selenium jar as the system property
     * webdriver.chrome.driver. If null, Selenium will attempt to find
     * ChromeDriver using PATH.
     *
     * example:
     * chromeDriver: './node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_2.38'
     */
    chromeDriver: (() => {
        if (process.platform === 'darwin') {
            return './node_modules/chromedriver/bin/chromedriver'
        }
        else {
            return './node_modules/chromedriver/lib/chromedriver/chromedriver.exe'
        }
    })(),


    // ---- To connect directly to Drivers ------------------------------------
    /**
     * If true, Protractor will connect directly to the browser Drivers
     * at the locations specified by chromeDriver and firefoxPath. Only Chrome
     * and Firefox are supported for direct connect.
     *
     * default: false
     */
    directConnect: (() => {
        return !(process.platform === 'linux')
    })(),

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
        ],
        smoke: [
            'specs/smoke_specs/basic_functionality_spec.js',
        ],
        self: [
            'specs/*/*_spec.js',
        ],
        svsc: [
            'specs/smoke_specs/SV_SC_spec.js'
        ],
        specs_require_file_download: [
            'specs/data_management_specs/DAB_excel_files_spec.js',
            'specs/pricing_specs/*_spec.js'
        ],
        bidLevels: [
            'specs/other_specs/baselines_metrics_spec.js',
            'specs/other_specs/global_defaults_spec.js',
            'specs/other_specs/global_totals_spec.js',
            'specs/other_specs/l1_bids_spec.js',
            'specs/other_specs/l2_client_countries_spec.js',
            'specs/other_specs/l3_businesses_spec.js',
            'specs/other_specs/l4_families_spec.js',
            'specs/other_specs/l5_offerings_spec.js',
            'specs/other_specs/l5_offerings_spec.js',
            'specs/other_specs/l6_cases_spec.js',
            'specs/other_specs/l7_clusters_spec.js',
            'specs/other_specs/l8_pools_spec.js',
            'specs/other_specs/labor_productivity_spec.js',
            'specs/other_specs/tags_spec.js',
            'specs/other_specs/unstructured_metrics_spec.js',
            'specs/_framework_internal/tree_spec.js',
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

        enableVideo: true,

        enableVNC: true,

        videoName: `${dateFormat(Date.now(), "yyyy-mm-dd HH:MM:ss")}: ${process.env.CI_JOB_ID}-${process.env.CI_JOB_NAME}.mp4`,

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
                    'default_directory': env.downloads
                    // 'default_directory': '/home/selenium/xlsx_data/Downloads'
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

        /** Set size for window */
        browser.driver.manage().window().setSize(
            env.connections.browserOptions.windowSize.width + 10, /* add std win walls */
            env.connections.browserOptions.windowSize.height + 93 /* add std win header */
        );

        /** Add reporter for get name of spec and suite inside it
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

        // let networkLogsMessagesArray = [];
        //
        // jasmine
        //     .getEnv()
        //     .afterEach(async () => {
        //
        //         /** Collects response logs with logCorrelationId from network console for all not-disabled tests */
        //
        //         const networkLogs = await browser.manage().logs().get('performance');
        //         for (let i = 0; i < networkLogs.length; i++) {
        //             const message = JSON.parse(networkLogs[i].message).message;
        //             if (message.method === 'Network.responseReceived') {
        //                 const pattern = /^[1-3]\d+/;
        //                 const statusCode = (message.params.response.status).toString();
        //                 if (!statusCode.match(pattern) && message.params.response.requestHeaders.Host !== "adfs-loc.evaluate-it.cloud") {
        //
        //                     const method = message.params.response.requestHeaders[':method'];
        //                     const path = message.params.response.requestHeaders[':authority'] + message.params.response.requestHeaders[':path'];
        //                     let logCorrelationId = 'logCorrelationId undefined';
        //                     if (message.params.response.requestHeaders.logcorrelationid) {
        //                         logCorrelationId = message.params.response.requestHeaders.logcorrelationid;
        //                     }
        //                     const networkLogResult = `${statusCode} ${method} ${path} logCorrId: ${logCorrelationId} `;
        //                     networkLogsMessagesArray.push(networkLogResult + "\n");
        //                 }
        //             }
        //         }console.log("Network log messages:\n " + networkLogsMessagesArray);
        //     });
        //
        // /** Reporter for generating custom JSON report with messages from browser and network console then sending it all to
        //  *  EFK for generation reports in Kibana
        //  */

        // jasmine.getEnv().addReporter({
        //
        //     specDone: async (result) => {
        //         let myResults = _.cloneDeep(result);
        //         delete myResults.passedExpectations;
        //         myResults.fullName = jasmine._currentSuiteName;
        //         myResults.browserLogsMessages = [];
        //         myResults.networkLogsMessages = networkLogsMessagesArray;
        //         myResults.failedMessage = [];
        //         myResults.expected = [];
        //         myResults.actual = [];
        //         myResults.stack = [];
        //         myResults.currentUrl = '';
        //         myResults.gitLabJobId = 0;
        //         myResults.pipeline = 0;
        //
        //         if (result.status !== 'disabled') {
        //
        //             /** Collects browser logs from console for failed tests */
        //
        //             if (result.status === 'failed') {
        //
        //                 let browserLog = await browser.manage().logs().get('browser');
        //                 for (let i = 0; i < browserLog.length; i++) {
        //                     if (!browserLog[i].message.includes('adfs')) {
        //                         await myResults.browserLogsMessages.push(`${browserLog[i].message}\n `);
        //                     }
        //                 }
        //                 for (let i = 0; i < myResults.failedExpectations.length; i++) {
        //                     myResults.failedMessage.push(myResults.failedExpectations[i].message);
        //                     myResults.expected = myResults.failedExpectations[i].expected;
        //                     myResults.actual.push(myResults.failedExpectations[i].actual);
        //                     myResults.stack.push(myResults.failedExpectations[i].stack);
        //                 }
        //                 myResults.screenShotLink = `http://vm199251.projects.local/CSC/CAP-N-QA-UIT/-/jobs/${process.env.CI_JOB_ID}/`
        //             }
        //
        //             delete myResults.failedExpectations;
        //             myResults.duration = loggerHelp.duration(result.duration);
        //             myResults.currentUrl = env.connections.baseUrl;
        //
        //             /**
        //              * Sends results to EFK only if runs on GitLab
        //              */
        //
        //             if (process.env.CI) {
        //                 /**
        //                  * Adds pipeline id to scheduled jobs to create nightly based report
        //                  */
        //                 if (process.env.CI_PIPELINE_SOURCE === "schedule") {
        //                     myResults.pipeline = parseInt(process.env.CI_PIPELINE_ID);
        //                 }
        //                 myResults.gitLabJobId = parseInt(process.env.CI_JOB_ID);
        //                 loggerHelp.logger.emit('specResult', myResults);
        //             }
        //             console.log(myResults);
        //             networkLogsMessagesArray = [];
        //         }
        //     }
        // });

        // browser.getProcessedConfig().then(function (config) {
        //     let message;
        //     if (!process.env.CI) {
        //         message = 'Local run, no GitLab data'
        //     } else {
        //         message = `Check result for \n
        //         JOB => ${process.env.CI_JOB_NAME} \n
        //         JOB_ID: ${process.env.CI_JOB_ID} \n
        //         PIPELINE_ID: ${process.env.CI_PIPELINE_ID} \n
        //         on the branch: ${process.env.CI_COMMIT_REF_NAME} \n
        //         for (${process.env.CI_ENVIRONMENT_URL}), \n
        //         blame ${process.env.GITLAB_USER_EMAIL}, \n
        //         last update is ${process.env.CI_COMMIT_MESSAGE}`
        //     }

            // jasmine.getEnv().addReporter(new webRep.WebReporter({
            //     username: 'RO-BOT',
            //     icon_emoji: ":robot_face:",
            //     projectName: process.env.CI_PROJECT_NAME,
            //     slackUrl: 'https://hooks.slack.com/services/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',
            //     channel: '#atqc_notification',
            //     message: message
            // }));
        // });
    },
};
