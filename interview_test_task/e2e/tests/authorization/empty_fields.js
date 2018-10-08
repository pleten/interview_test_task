const mainPage = require("../../pages/mainPage.js");
const authPage = require("../../pages/authorizationPage.js");

let emailMsg = "Oops, please\nenter your email";
let passwdMsg = "Looks like you’ve\nmissed this one";

describe('​Authorization page. Empty fields', function () {

    it('Home page has to be opened', function () {
        mainPage.openHomePage();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl);
    });

    it('Authorization page has to be opened', function () {
        mainPage.clickSingInBtn();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl+"authorize");
    });

    it('don’t fill Email and Password', function () {
        authPage.setUserData("", "");
        authPage.clickLoginBtn();
        expect(authPage.emailTooltipMsg.getText()).toEqual(emailMsg);
        expect(authPage.passwdTooltipMsg.getText()).toEqual(passwdMsg);
    });
});