let HomePage = require('../pages/homePage.js');
let LoginPage = require('../pages/loginPage.js');
let userData = require('../data/userData');
let errorsTexts = require('../data/errorsTexts');


describe('Protractor Demo App', function() {

    beforeEach(() => {
        HomePage.get();
    });

    afterEach(function() {
        browser.driver.manage().deleteAllCookies();
    });

    it('Authorization page (Welcome back!)', () => {
        HomePage.openLoginPage();
        LoginPage.enterEmail(userData.testUser.email);
        LoginPage.enterPassword(userData.testUser.password);
        LoginPage.showPassword();
        expect(LoginPage.getPassword()).toEqual(userData.testUser.password);
        LoginPage.pressLoginButton();
        expect(HomePage.getCurrentUser()).toEqual(userData.testUser.email);
    });

    it('Authorization page. Not registered user', () => {
        HomePage.openLoginPage();
        LoginPage.enterEmail(userData.userThatDoesNotExist.email);
        LoginPage.enterPassword(userData.userThatDoesNotExist.password);
        LoginPage.showPassword();
        expect(LoginPage.getPassword()).toEqual(userData.userThatDoesNotExist.password);
        LoginPage.pressLoginButton();
        expect(LoginPage.getNotificationText()).toEqual(errorsTexts.incorrectPassword);
    });

    it('Authorization page. Invalid email', () => {
        HomePage.openLoginPage();
        LoginPage.enterEmail(userData.userWithInvalidEmail.email);
        LoginPage.enterPassword(userData.userWithInvalidEmail.password);
        LoginPage.showPassword();
        expect(LoginPage.getPassword()).toEqual(userData.userWithInvalidEmail.password);
        LoginPage.pressLoginButton();
        expect(LoginPage.getErrors().count()).toEqual(1);
        expect(LoginPage.getErrors().get(0).getText()).toEqual(errorsTexts.invalidEmail);
    });

    it('Authorization page. Empty fields', () => {
        HomePage.openLoginPage();
        LoginPage.enterEmail("");
        LoginPage.enterPassword("");
        LoginPage.pressLoginButton();
        expect(LoginPage.getErrors().count()).toEqual(2);
        expect(LoginPage.getErrors().get(0).getText()).toEqual(errorsTexts.emptyEmail);
        expect(LoginPage.getErrors().get(1).getText()).toEqual(errorsTexts.emptyPassword);
    });

    it('Log Out', () => {
        HomePage.openLoginPage();
        LoginPage.login(userData.testUser.email, userData.testUser.password);
        expect(HomePage.getCurrentUser()).toEqual(userData.testUser.email);
        HomePage.logout();
        expect(browser.getCurrentUrl()).toEqual('https://www.ssls.com/authorize');
    });

});