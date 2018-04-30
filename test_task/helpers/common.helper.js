const _ = require('lodash');
/**
 * Common helper object.
 * @constructor
 */
const CommonHelper = function () {
    /**
     * Comparing items
     *
     * @params items
     */
    this.compareItems = function (a, b) {
       return _.isEqual(a, b);
    };

    /**
     * Sorting arrays
     *
     * @param array
     */

    this.sortArray = function (array) {
        array.sort(function (a, b) {
            return a - b
        });
    };

    /**
     * Wait until selected element will be present in DOM
     *
     * @param element
     */
    this.waitUntilElementPresent = function (element) {
        const EC = protractor.ExpectedConditions;
        browser.driver.wait(EC.presenceOf(element));
    };

    /**
     * Wait until selected element will be visible
     *
     * @param element
     */
    this.waitUntilElementVisible = function (element) {
        const EC = protractor.ExpectedConditions;
        browser.driver.wait(EC.visibilityOf(element));
    };

    /**
     * Wait until selected URL will be opened
     *
     * @param url
     */

    this.waitUntilUrlOpened = function (url) {
        const EC = protractor.ExpectedConditions;
        browser.driver.wait(EC.urlContains(url));
    };

    this.element = function (selector) {
        return selector;
    };

    /**
     * Clear and fill text input
     *
     * @params selector, text
     */

    this.fillTextInput = function (selector, text) {
        this.waitUntilElementPresent(this.element(selector));
        this.element(selector).clear();
        this.element(selector).sendKeys(text);
    };
};

module.exports = new CommonHelper();
