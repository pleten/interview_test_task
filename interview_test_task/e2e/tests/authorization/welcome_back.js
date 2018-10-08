const mainPage = require("../../pages/mainPage.js");
const authPage = require("../../pages/authorizationPage.js");

let userLogin = "ssls.automation+5@gmail.com";
let userPasswd = "123456";

describe('Authorization page (Welcome back!)', function () {

    afterAll(function () {
        mainPage.logOut();
    });
    
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

    it('"Log in" button has to be changed on "User@email" button', function () {
        authPage.clickLoginBtn();
        expect(mainPage.userEmailBtn.getText()).toEqual(userLogin);
    });
});