import { browser, ExpectedConditions, ElementFinder } from "protractor";

export class Waiters{
    public async waitForVisibility(webElement: ElementFinder, waitingTime: number = 5000){
        await browser.wait(ExpectedConditions.visibilityOf(webElement), waitingTime);
    }  // waitForVisibility
}