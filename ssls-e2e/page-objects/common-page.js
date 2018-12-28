class CommonPage {

    waitForElementStabilized(element) {
        browser.driver.wait(function () { return element.isDisplayed() });
    }

    refreshBrowser() {
        browser.driver.manage().deleteAllCookies();
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');
    }
}

module.exports = new CommonPage();