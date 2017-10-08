'use strict';

var BaseTest = function() {
    this.openPage = function(url) {
        browser.get(browser.baseUrl + url);
    };

    this.clearLocalStorage = function() {
        browser.executeScript('window.localStorage.clear();');
        browser.executeScript('window.sessionStorage.clear();');
        browser.driver.manage().deleteAllCookies();
    };
};

module.exports = BaseTest;