'use strict';

let BaseTest = require('../Tests/BaseTest');
let BasePage = require('../Pages/BasePage');
let AuthorizationPage = require('../Pages/AuthorizationPage');
let HomePage = require('../Pages/HomePage');

describe('Log out', function() {
    let baseTest = new BaseTest();
    let basePage = new BasePage();
    let authorizationPage = new AuthorizationPage();
    let homePage = new HomePage();
    let email = 'ssls.automation+5@gmail.com';
    let password = '123456';
    let authorizationUrl = 'https://www.ssls.com/authorize';

    beforeAll(function() {
        baseTest.openPage('/');
        homePage.btnLogIn.click();
        authorizationPage.login(email, password);
    });

    afterAll(function() {
        baseTest.clearLocalStorage();
    });

    it('should log out and redirected on authorization page', function() {
        basePage.logout();
        expect(browser.getCurrentUrl()).toEqual(authorizationUrl);
    });
});