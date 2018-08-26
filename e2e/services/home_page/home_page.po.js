let commonHelper = require('./../helpers/common.helper.js');

let HomePage = function() {

    //--------------------------------------------------------------------------
    // Elements
    //--------------------------------------------------------------------------

    this.logBox                   = $('.log-box');

    this.buttonLogin              = this.logBox.$('[href="/authorize"]');

    this.buttonCertificates       = this.logBox.$('.round[href="/user/certificates"]');

    this.dropdownMenuProfile      = this.logBox.$('.dropdown-btn');

    this.textLimited              = $('[class="ribbon"]');

    this.buttonLogOut             = $('[ng-click="$ctrl.logout()"]');

    this.buttonUserProfile        = $('[ui-sref="user.profile"]');

    this.allCertificatesNames     = $$('[class="ssl-name ng-binding"]');

    this.allCertificatesPrices    = $$('[class="ssl-price-box"] .lg-price');

    //--------------------------------------------------------------------------
    // Functions
    //--------------------------------------------------------------------------

    this.clickLogin = function () {
        commonHelper.waitForElementAndClick(this.buttonLogin);
    };

    this.clickDropdownMenuProfile = function () {
        commonHelper.waitForElementAndClick(this.dropdownMenuProfile);
    };

    this.clickLogout = function () {
        commonHelper.waitForElementAndClick(this.buttonLogOut);
    };

    this.logOut = function () {
        this.clickDropdownMenuProfile();
        this.clickLogout();
    };

    this.clickUserProfile = function() {
        commonHelper.waitForElementAndClick(this.buttonUserProfile);
    };

    this.openUserProfile = function () {
        this.clickDropdownMenuProfile();
        this.clickUserProfile();
    };

    this.filterItem = function (text) {
        return element(by.cssContainingText('.filter-item', text));
    };

    this.clickFilterItem = function (text) {
        commonHelper.waitForElementAndClick(this.filterItem(text));
    };

    this.getSpecificCertificate = function (text) {
        return element.all(by.xpath('//*[@ng-bind-html="product.excerptDescription"]//*[contains(text(), "' + text + '")]//ancestor::*[contains(@class,"ssl-item ")]/*[@class="ssl-title"]//*[@class="ssl-name ng-binding"]'));
    };

    this.getAllNotNeededCertificates = function (neededCertificatesArray) {
        let allNotNeededCertificates = [];
        this.allCertificatesNames.each(function (element) {
            element.getText().then(function (value) {
                if(!neededCertificatesArray.includes(value)){
                    allNotNeededCertificates.push(value);
                }
            });
        });
        return allNotNeededCertificates;
    };

    this.getAllNeededCertificates = function (text) {
        let allNeededCertificates = [];
        this.getSpecificCertificate(text).each(function (element) {
            element.getText().then(function (value) {
                allNeededCertificates.push(value);
            });
        });
        return allNeededCertificates;
    };

    this.getAllCertificates = function () {
        let allCertificates = [];
        commonHelper.waitUntilElementVisible(this.allCertificatesNames.first());
        this.allCertificatesNames.each(function (element) {
            element.getText().then(function (value) {
                allCertificates.push(value);
            });
        });
        return allCertificates;
    };

    this.certificateByName = function (name) {
        return element(by.xpath('//*[@class="ssl-name ng-binding"][.="' + name + '"]'));
    };

    this.isSorted = function (array) {
        const limit = array.length - 1;
        return array.every((_, i) => (i < limit ? array[i] <= array[i + 1] : true));
    };

    this.checkSortedByPrice = function () {
        let tempArray = [];
        this.allCertificatesPrices.each(function (element) {
            element.getAttribute('value').then(function (value) {
                tempArray.push(parseInt(value));
            });
        });
        expect(this.isSorted(tempArray)).toEqual(true);
    };
};

module.exports = new HomePage();