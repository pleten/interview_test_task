declare const allure: any
import { browser } from 'protractor'

export const takeScreenshot = async function (title = 'Screenshot') {
        const png = await browser.takeScreenshot()
        return allure.createAttachment(title, new Buffer(png, 'base64'), 'image/png')
    }
