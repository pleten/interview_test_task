import {browser, Config} from "protractor";
import {resolve} from "path";
import {platform, release} from "os";
import moment = require("moment");

const platformName: string = (platform() === 'win32') ? 'Windows' : platform();
const platformVersion: string = (platform() === 'win32') ? '10' : release();

const seleniumServerStandalonePath: string = resolve(__dirname, '../node_modules/protractor/',
    'node_modules/webdriver-manager/selenium/');

export const config: Config = {
    params: {
        regTestUser: {
            email: 'ssls.automation+5@gmail.com',
            password: '123456'
        }
    },

    localSeleniumStandaloneOpts: {
        jvmArgs: [`-Dwebdriver.chrome.driver=${seleniumServerStandalonePath}/chromedriver_75.0.3770.8.exe`]
    },

    directConnect: false,

    getPageTimeout: 60 * 1000,

    allScriptsTimeout: 180 * 1000,

    capabilities: {
        browserName: 'chrome',
        platform: `${platformName} ${platformVersion}`,
        chromeOptions: {
            args: ['--disable-infobars']
        },
        shardTestFiles: false,
        metadata: {
            browser: {
                name: 'Chrome',
                version: '75.0.3770.80 (Official Build) (64-bit)'
            },
            device: 'Desktop',
            platform: {
                name: platformName,
                version: platformVersion
            }
        }
    },

    specs: ['../src/features'],

    framework: 'custom',

    frameworkPath: require.resolve('protractor-cucumber-framework'),

    cucumberOpts: {
        format: `json:./run-results/reports/report.json`,
        strict: true,
        profile: false,
        require: [
            'features/step_definitions/**/*.js',
            'features/support/**/*.js'
        ],
        tags: '@regression'
    },

    onPrepare: async () => {
        await browser.manage().window().maximize();
    },

    plugins: [
        {
            package: 'protractor-multiple-cucumber-html-reporter-plugin',
            options: {
                theme: 'hierarchy',
                automaticallyGenerateReport: true,
                removeExistingJsonReportFile: true,
                reportPath: resolve(__dirname, `../run-results/reports`),
                reportName: 'TEST REPORT',
                customData: {
                    title: 'Run info',
                    data: [
                        {label: 'Project', value: 'SSL Certificates'},
                        {label: 'Task', value: 'QA Automation'},
                        {
                            label: 'Execution Start Time',
                            value: `${moment().format('MM/DD/YYYY hh:mm:ss:SSS Z')}`
                        },
                    ]
                },
                displayDuration: true,
                durationInMS: true,
                saveCollectedJSON: false
            }
        }
    ]
};