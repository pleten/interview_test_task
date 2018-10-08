const mainPage = require("../../pages/mainPage.js");

let userLogin = "ssls.automation+5@gmail.com";
let userPasswd = "123456";

describe('​Log Out', function () {

    beforeAll(function () {
        mainPage.authUser(userLogin, userPasswd);
    });

    it('should log out and redirected on authorization page', function () {
        mainPage.logOut();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl+"authorize");
    });

});