import { readFileSync } from 'fs';
import { SpecReporter } from 'jasmine-spec-reporter';
import { resolve } from 'path';
import { browser, Config } from 'protractor';
import { allureReporter, allureRuntime } from './framework/reporters/allure';
import { ConsoleLog } from './framework/reporters/console.log';
import { CustomProcessor } from './framework/reporters/jasmine.custom.processor';

const specTimeout = 360000;
export const defaultDownloadsPath = resolve(__dirname, '../test-results/downloads/');
export let config: Config = {
    allScriptsTimeout: specTimeout,
    getPageTimeout: specTimeout,
    framework: 'jasmine',
    directConnect: true,
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            prefs: {
                download: {
                    directory_upgrade: true,
                    prompt_for_download: false,
                    default_directory: defaultDownloadsPath,
                },
            },
            args: [
                // '--start-maximized',
                '--headless',
                '--window-size=1920,2160',
                '--disable-gpu',
            ],
        },
    },
    specs: ['test-suites/**/*.js'],
    SELENIUM_PROMISE_MANAGER: false,
    async onPrepare() {
        await browser.driver.sendChromiumCommand('Page.setDownloadBehavior', {
            behavior: 'allow',
            downloadPath: defaultDownloadsPath,
        });
        allureRuntime.writeExecutorInfo({
            name: `Protractor ${JSON.parse(readFileSync('./package.json', 'utf8').toString()).dependencies.protractor}`,
            type: 'Framework',
        });
        allureRuntime.writeEnvironmentInfo(await ConsoleLog.systemInfo());
        jasmine.getEnv().clearReporters();
        jasmine.getEnv().addReporter(allureReporter);
        jasmine.getEnv().addReporter(
            new SpecReporter({
                customProcessors: [CustomProcessor],
                spec: {
                    displayDuration: true,
                    displayErrorMessages: true,
                    displaySuccessful: true,
                    displayFailed: true,
                    displayPending: false,
                    displayStacktrace: true,
                },
                summary: {
                    displayDuration: true,
                    displayErrorMessages: false,
                    displaySuccessful: true,
                    displayFailed: true,
                    displayPending: false,
                    displayStacktrace: false,
                },
                print: (log: string) => {
                    console.log(log);
                },
            }),
        );
    },
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: specTimeout,
        print() {},
    },
    disableChecks: true,
    noGlobals: false,
};
