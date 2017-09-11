var webdriver = require('selenium-webdriver'),
    assert = require('assert'),
    should = require('chai').should();
    Weblibrary = require('../libs/WebLibrary'),
    By = webdriver.By,
    until = webdriver.until,
    utils = require('../utils/utils');

class NawigationBarPage extends Weblibrary {

    constructor(driver) {

        super(driver);
    }

    // -----------------  Elements  ------------------
    async loginButton() {
        return await this.getWebElement("[href='/authorize']");
    }

    async ddMenuButton() {
        return await this.getWebElement(".log-box button");
    }

    async logOutButton() {
        return await this.getWebElement("[ng-click='logout()']");
    }

    async viewProfileButton() {
        return await this.getWebElement("a[href$='profile']");
    }

//----------------------  Methods  -------------------
    async openLoginPage() {

        await this.clickWebElement(await this.loginButton());
    }


    async openProfile() {

        await this.clickWebElement(await this.ddMenuButton());
        await this.clickWebElement(await this.viewProfileButton());
    }


    async logOut() {

        await this.clickWebElement(await this.ddMenuButton());
        await this.clickWebElement(await this.logOutButton());
        await this.driver.wait(await until.elementIsVisible(await this.loginButton()),7000);

    }

    async checkThatNoLoginButton() {

        await this.driver.sleep(1000);
        let x = await this.driver.findElements(By.css("[href='/authorize']"));

        if (x.length > 0){
            return true;
        }else{
            return false;
        }
    }

}





module.exports = NawigationBarPage;