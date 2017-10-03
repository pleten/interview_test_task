'use strict';

var BaseTest = function() {
    this.openPage = function(url) {
        browser.get(browser.baseUrl + url);
    };

    this.getLocalStorage = function() {
        browser.executeScript("return window.localStorage;");
    };

    this.clearLocalStorage = function() {
        browser.executeScript("return window.localStorage.clear();");
    };
};

module.exports = BaseTest;
