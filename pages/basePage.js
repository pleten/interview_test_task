export default class BasePage {
    constructor() {
    
    }
    pageIsLoaded() {
        return browser.wait(browser.executeScript('return document.readyState == "complete"'), 
        2000, 
        'timeout: waiting for page to load. The url is: ' + this.url);
    }
    
    open() {
        browser.get(this.url, 1000);
        return this.pageIsLoaded();
    }

    isVisible(locator) {
        return browser.wait(protractor.ExpectedConditions.visibilityOf(locator), 3000);
    }

    isNotVisible(locator) {
        return browser.wait(protractor.ExpectedConditions.invisibilityOf(locator), 3000);
    }

    isClickable(locator) {
        return browser.wait(protractor.ExpectedConditions.elementToBeClickable(locator), 3000);
    }

    hasText(locator, text) {
        return browser.wait(protractor.ExpectedConditions.textToBePresentInElement(locator, text), 3000);
    }

    titleIs(title) {
        return browser.wait(protractor.ExpectedConditions.titleIs(title), 3000);
    }
    clearBrowserStorage(){
        browser.executeScript('window.localStorage.clear();');
        browser.executeScript('window.sessionStorage.clear();');
        browser.driver.manage().deleteAllCookies(); 
    }

}