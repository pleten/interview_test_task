import { browser, element, by, logging, ElementFinder, ExpectedConditions, ElementArrayFinder } from "protractor";
import { CustomLogger } from "../../utils/logger/CustomLogger";

export class BasePage{
    public async enterText(text:string, locator: string): Promise<void>{
        browser.wait(ExpectedConditions.visibilityOf(element(by.xpath(locator))));
        await element(by.xpath(locator)).clear();
        return element(by.xpath(locator)).sendKeys(text);
    }

    public async getPageUrl(){
        return browser.getCurrentUrl();        
    }  // getPageUrl

    public isElementVisible(locator: string){
        return element(by.xpath(locator)).isDisplayed();
    }  // isElementVisible

    public async getElementText(locator: string){
        return element(by.xpath(locator)).getText();
    }  // getElementText

    public async clickElement(locator: string){
        CustomLogger.logging("Click at the element: " + locator);
        await browser.wait(ExpectedConditions.visibilityOf(element(by.xpath(locator))), 5000);
        return element(by.xpath(locator)).click();
    }  // clickElement

    public getElement(locator: string): ElementFinder{
        return element(by.xpath(locator));
    }  // getElement

    public getElements(locator: string): ElementArrayFinder{
        return element.all(by.xpath(locator));
    }  // getElements
}
