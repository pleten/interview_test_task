import { AllureConfig, AllureRuntime, ContentType, JasmineAllureReporter } from 'jasmine-allure2-reporter';
import { browser } from 'protractor';

const allureConfig = new AllureConfig('test-results/allure-results');

export const allureRuntime = new AllureRuntime(allureConfig);
export const allureReporter = new JasmineAllureReporter(allureRuntime);
export const allureInterface = allureReporter.getInterface();

export class Allure {
    static async attachScreenshot(attachmentName: string, content: Buffer) {
        if (content === undefined) {
            content = Buffer.from(await browser.takeScreenshot(), 'base64');
        }
        const screenshot = await browser.takeScreenshot();
        allureInterface.attachment(attachmentName, content, ContentType.PNG);
    }

    static async attachJsonToAllure(attachmentName: string, json: any) {
        allureInterface.attachment(attachmentName, JSON.stringify(json), ContentType.JSON);
    }
}
