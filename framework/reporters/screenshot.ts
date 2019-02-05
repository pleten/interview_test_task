import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { browser } from 'protractor';
import { Allure } from './allure';

const defaultScreenshotsFolder = resolve('./test-results/screenshots');

export class ScreenShot {
    static async save(fileName: string, folder = defaultScreenshotsFolder) {
        const screenshot = await browser.takeScreenshot();
        const image = Buffer.from(screenshot, 'base64');
        if (!existsSync(folder)) {
            mkdirSync(folder);
        }
        const fullFileName = `${fileName}.png`;
        writeFileSync(resolve(folder, fullFileName), image);
        await Allure.attachScreenshot(fullFileName, image);
        return image;
    }
}
