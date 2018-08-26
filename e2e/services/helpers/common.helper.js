let EC = protractor.ExpectedConditions;

let CommonHelper = function() {

    this.clearSessionStorage = function () {
        browser.executeScript('window.sessionStorage.clear();');
    };

    this.clearLocalStorage = function () {
        browser.executeScript('window.localStorage.clear();');
    };

    this.clearCookies = function () {
        browser.manage().deleteAllCookies();
    };

    this.clearAllData = function () {
        this.clearSessionStorage();
        this.clearLocalStorage();
        this.clearCookies();
    };

    this.waitUntilElementIsNotPresent = function (element) {
        browser.driver.wait(EC.stalenessOf(element));
    };

    this.waitUntilElementVisible = function (element) {
        browser.driver.wait(EC.visibilityOf(element));
    };

    this.waitUntilTextInElement = function (element, text) {
        browser.driver.wait(EC.textToBePresentInElement(element, text));
    };

    this.fillField = function (element, text) {
        this.waitUntilElementVisible(element);
        element.clear();
        element.sendKeys(text);
    };

    this.waitForElementAndClick = function (element) {
        this.waitUntilElementVisible(element);
        element.click();
    };
};

module.exports = new CommonHelper();