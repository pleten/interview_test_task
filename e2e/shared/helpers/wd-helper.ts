import {browser, ElementFinder, ExpectedConditions} from 'protractor';

const TIMEOUT = 8000;
    export async function waitFor(condition: Function, opt_message?: string) {
        await browser.wait(condition, TIMEOUT, opt_message);
    }

    export async function  waitForVisible(elem: ElementFinder) {
        await this.waitFor(ExpectedConditions.visibilityOf(elem), 'Waiting for appearing ' + elem.locator());
    }

    export async function  waitForClickable(button: ElementFinder) {
        return this.waitFor(ExpectedConditions.elementToBeClickable(button), 'Waiting for clickable ' + button.locator());
    }

    export async function  safeClick(button: ElementFinder) {
        await this.waitForVisible(button);
        await this.waitForClickable(button);
        await button.click();
    }