var webdriver = require('selenium-webdriver'),
    assert = require('assert'),
    should = require('chai').should();
    Weblibrary = require('../libs/WebLibrary'),
    By = webdriver.By,
    until = webdriver.until,
    utils = require('../utils/utils');

class ProfilePage extends Weblibrary{

    constructor(driver){

        super(driver);
    }

    // -----------  WebElements -------------


    async refreshPinButton() {

        return await this.getWebElement('[name="supportPin"]');
    }


    async pinTextElement() {

        return await this.getWebElement("[ng-class*='pin'] .ng-binding");
    }

    async nameValue() {

        return await this.getWebElement("[ng-hide*=name]");
    }

    async emailValue() {

        return await this.getWebElement("[ng-class*=email] .description > span");
    }

    async phoneValue() {

        return await this.getWebElement("[ng-class*=phone] .description > span");
    }

    async addressValue() {

        return await this.getWebElement("[ng-class*=address] .description > span");
    }

    async newsLetterValue() {

        return await this.getWebElement("[ng-class*=newsletter] button");
    }

    // -----------   Methods   -------------



    async clickRefreshPIN() {

        await this.clickWebElement(await this.refreshPinButton());
        await this.driver.sleep(500);

    }



}


module.exports = ProfilePage;