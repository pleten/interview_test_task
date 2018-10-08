const mainPage = require("../../pages/mainPage.js");
const authPage = require("../../pages/authorizationPage.js");

const EC = protractor.ExpectedConditions;

let userLogin = "test@@test.com";
let userPasswd = "123456";
let notificationMsg = "Uh oh! This\nisn’t an email";

describe('​Authorization page. Invalid email', function () {

    it('Home page has to be opened', function () {
        mainPage.openHomePage();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl);
    });

    it('Authorization page has to be opened', function () {
        mainPage.clickSingInBtn();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl+"authorize");
    });

    it('After click on "eye" icon for password field, password should be displayed', function () {
        authPage.setUserData(userLogin, userPasswd);
        authPage.clickEyeBtn();
        expect(authPage.passwdInput.getAttribute("type")).toEqual("text");
    });

    it('filled "Email" field with non-email value', function () {
        browser.wait(EC.visibilityOf(authPage.emailTooltipMsg), 5000);
        expect(authPage.emailTooltipMsg.getText()).toEqual(notificationMsg);
    });
});