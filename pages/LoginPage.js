var webdriver = require('selenium-webdriver'),
    assert = require('assert'),
    utils = require('../utils/utils'),
    should = require('chai').should();
    Weblibrary = require('../libs/WebLibrary'),
    By = webdriver.By,
    until = webdriver.until,
    utils = require('../utils/utils');

class LoginPage extends Weblibrary{

    constructor(driver){

        super(driver);
    }


    async login() {

        await this.inputTextInWebElement(await this.emailField(), utils.user1.email);
        await this.inputTextInWebElement(await this.passwordField(), utils.user1.pass);
        await this.clickWebElement(await this.loginSubmitButton());

    }

    // -----------  WebElements -------------


    async emailField() {
        return await this.getWebElement("[name='authForm'] [name='email']");
    }


    async passwordField() {
        return await this.getWebElement("[name='authForm'] [name='password']");
    }

    async loginSubmitButton() {
        return await this.getWebElement("[name='authForm'] [type='submit']");
    }


    async eyeIcon() {
        return await this.getWebElement(".icon-eye");
    }

    async authorizationText() {
    return await this.getWebElement("h1");
    }

    async errorNotification() {
        return await this.getWebElement("#noty_topCenter_layout_container span");
    }

    // -----------   Methods   -------------


    async clickOnEyeIcon() {

        await this.clickWebElement(await this.eyeIcon());

    }


    async checkPasswordIsOpen() {

        let passwordType = await this.getAttribute(await this.passwordField(),'type');
        passwordType.should.equal("text");

    }


}


module.exports = LoginPage;