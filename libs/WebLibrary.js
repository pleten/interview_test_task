
var webdriver = require('selenium-webdriver'),
    test = require('selenium-webdriver/testing'),
    should = require('chai').should();
    utils = require('../utils/utils'),
    assert = require('assert'),
    fs = require('fs'),
    By = webdriver.By,
    until = webdriver.until;


class WebLibrary {
    
    constructor(driver){
        
        this.driver = driver;

    }

    async openHomePage() {
        await this.driver.get(utils.environmentURL);
    }


    async takeScreenShot() {
        let d = new Date;
        let data = await this.driver.takeScreenshot(fs);
        let path = "./screenshots/" + d.getDate() + "-" + d.getHours()+ "-" + d.getMinutes()+ "-" + d.getMilliseconds() + ".png";
        console.log("Screenshot was made - " + path);
        fs.writeFileSync(path, data, 'base64' );
    }

    async getText(webelement) {

        return await webelement.getText();/////

    }

    async getWebElement(locator) {

        await this.driver.wait(await until.elementIsVisible(await this.driver.findElement(By.css(locator))),7000);/////
        return await this.driver.findElement(By.css(locator));
    }


    async clickWebElement(webElement) {

        try {

            await this.driver.wait(await until.elementIsVisible(webElement),7000);
            await webElement.click();

        } catch (error) {

            await this.takeScreenShot();
            console.error("Such click-WEb Element not found: " + webElement.name);
            throw error;
        }
    }

    async inputTextInWebElement(webElement, text) {

        try {
            until.elementIsVisible(webElement);
            until.elementIsEnabled(webElement);
            await webElement.clear();
            await webElement.sendKeys(text);


        } catch (error) {

            await this.takeScreenShot();
            console.error("Such element not found: " + webElement.name);
            throw error;
        }
    }

    async getAttribute(webElement, attribute) {

        return await webElement.getAttribute(attribute);
    }


    async checkWebElementTextMatching(webElement, expectedText){

        let text = await this.getText(webElement);

        try {

            text.should.equal(expectedText);

        }catch (e) {

            await this.takeScreenShot();
            throw e;
        }
    }

}

module.exports = WebLibrary;