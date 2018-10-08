const EC = protractor.ExpectedConditions;
const time = 5000;

function common() {

    this.openUrl = function (url) {
        browser.get(url)
    };

    this.click = function (element) {
        browser.wait(EC.visibilityOf(element), time);
        element.click();
    };

    this.sendKeys = function (element, value) {
        browser.wait(EC.visibilityOf(element), time);
        element.click();
        element.clear();
        element.sendKeys(value);
    };

    this.waitVisible = function (element) {
        browser.wait(EC.visibilityOf(element), time);
    }
}
module.exports = new common();