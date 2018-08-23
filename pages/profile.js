'use strict';

let profilePage = function() {

    //Elements

    const refreshPinIcon = element(by.name('supportPin'));
    const pageTitle = element(by.className('page-title'));
    const newsletterSwitcher = element(by.css('[ng-class*=newsletter] button'));

    //Actions

    this.getPageTitle = function () {
        return pageTitle.getText();
    };

    this.valueInUserProfile = function (name) {
        let value = element(by.css(`[ng-class*=${name}] .text.ng-binding`));
        return value
    };

    this.getValueFromProfile = function (name) {
        return this.valueInUserProfile(name).getText();
    };

    this.getValueOfNewsletter = function () {
        return newsletterSwitcher.getAttribute('class');
    };

    this.clickPinIcon = function () {
        refreshPinIcon.click()
    }
};
module.exports = new profilePage();