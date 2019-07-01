import {browser, ExpectedConditions} from "protractor";

export const commonMethods = {
    isElementDisplayed,
    hoverTheMouseOverElement,
    waitLittleBit
}

async function isElementDisplayed(element) {
    try {
        await browser.wait(ExpectedConditions.visibilityOf(element), 7000);
        return await element.isDisplayed();
    } catch (e) {
        return false;
    }
}

async function hoverTheMouseOverElement(element: any) {
    await browser.wait(ExpectedConditions.presenceOf(element), 3000);
    await browser.actions().mouseMove(element).perform();
}

async function waitLittleBit(timeout){
    await browser.sleep(timeout);
}