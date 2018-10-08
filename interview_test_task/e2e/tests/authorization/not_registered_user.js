const mainPage = require("../../pages/mainPage.js");
const authPage = require("../../pages/authorizationPage.js");

const EC = protractor.ExpectedConditions;

let userLogin = "notRegistered@email.com";
let userPasswd = "123456";
let notificationMsg = "Uh oh! Email or password is incorrect";

describe('​Authorization page. Not registered user', function () {

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

    it('"Uh oh! Email or password is incorrect"', function () {
        authPage.clickLoginBtn();
        browser.wait(EC.visibilityOf(authPage.notificationMsg), 5000);
        expect(authPage.notificationMsg.getText()).toEqual(notificationMsg);
    });
});