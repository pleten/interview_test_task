const pageObject = require('../../services/pages').container.PageObject;
const abstractPage = pageObject.getAbstractPage();
const commonHelper = require('./../../helpers/common.helper.js');


const LoginPage = function () {

    //--------------------------------------------------------------------------
    // Elements
    //--------------------------------------------------------------------------

    this.frmLogin = $('form[name="authForm"]');
    this.txtEmail = this.frmLogin.$('input[name="email"]');
    this.txtPassword = this.frmLogin.$('input[name="password"]');
    this.btnEye = $('button[ng-click="showPassword = !showPassword"]');
    this.btnSubmit = this.frmLogin.$('button[type="submit"]');
    this.invEmailTooltip = $('.email div[ng-show*="error.pattern"]');
    this.txtInvEmailTooltip = this.invEmailTooltip.$('span');
    this.emptyEmailTooltip = $('.email div[ng-show*="error.required"]');
    this.txtEmptyEmailTooltip = this.emptyEmailTooltip.$('span');
    this.passTooltipError = $('.input-group .tooltip');
    this.txtPassErrorTooltipText = this.passTooltipError.$('span');



    //--------------------------------------------------------------------------
    // Functions
    //--------------------------------------------------------------------------

    this.login = function (email, password) {
        this.fillLoginForm(email, password);
        this.submitLoginForm();
    };

    this.fillLoginForm = function(email, password) {
        commonHelper.waitUntilElementVisible(this.frmLogin);
        this.fillEmail(email);
        this.fillPassword(password);
    };

    this.fillEmail = function(email) {
        commonHelper.fillTextInput(this.txtEmail, email);
    };

    this.fillPassword = function(password) {
        commonHelper.fillTextInput(this.txtPassword, password);
    };

    this.showPassword = function () {
        this.btnEye.click();
    };

    this.submitLoginForm = function () {
        commonHelper.waitUntilElementVisible(this.btnSubmit);
        this.btnSubmit.click();
    };

    this.invEmailTooltipText = async function () {
        return await this.getTextFromTooltip(this.txtInvEmailTooltip)
    };

    this.emptyEmailTooltipText = async function () {
        return await this.getTextFromTooltip(this.txtEmptyEmailTooltip);
    };

    this.errorPassTooltipText = async function () {
        return await this.getTextFromTooltip(this.txtPassErrorTooltipText);
    };

    this.getTextFromTooltip = async function (tooltip) {
        const str = await tooltip.getText();
        return str.replace(/\n/g, ' ');
    };
};

module.exports = LoginPage;
