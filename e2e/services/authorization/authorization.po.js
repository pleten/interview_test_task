let commonHelper = require('./../helpers/common.helper.js');

let AuthorizationPage = function() {

    //--------------------------------------------------------------------------
    // Elements
    //--------------------------------------------------------------------------

    this.textPageTitle = $('[class="page-title"]');

    this.fieldLogin = element(by.model('form.email'));

    this.fieldPassword = element(by.model('form.password'));

    this.buttonEye = $('[ng-click*="showPassword"]');

    this.errorNotify = $('[class="noty_text"]');

    this.buttonLogin = $('.email-box [type="submit"]');

    //--------------------------------------------------------------------------
    // Functions
    //--------------------------------------------------------------------------

    this.fillLogin = function (text) {
        commonHelper.fillField(this.fieldLogin, text);
    };

    this.fillPassword = function (text) {
        commonHelper.fillField(this.fieldPassword, text);
    };

    this.seePasswordFieldType = function (type) {
        expect(this.fieldPassword.getAttribute('type')).toEqual(type);
    };

    this.clickEye = function () {
        commonHelper.waitForElementAndClick(this.buttonEye);
    };

    // fieldName = email || password
    this.getFieldRequiredErrorText = function (fieldName) {
        let element = $('[ng-show*="authForm.' + fieldName + '.$error.required"]');
        commonHelper.waitUntilElementVisible(element);
        return element.getText();
    };

    // fieldName = email || password
    this.getFieldInvalidErrorText = function (fieldName) {
        let element = $('[ng-show*="authForm.' + fieldName + '.$error.pattern"]');
        commonHelper.waitUntilElementVisible(element);
        return element.getText();
    };

    this.clickLogin = function () {
        commonHelper.waitForElementAndClick(this.buttonLogin);
    };
};

module.exports = new AuthorizationPage();