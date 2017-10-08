'use strict';

let BaseTest = require('../Tests/BaseTest');
let AuthorizationPage = require('../Pages/AuthorizationPage');
let HomePage = require('../Pages/HomePage');

describe('Authorization page.Welcome back!', function() {
    let baseTest = new BaseTest();
    let authorizationPage = new AuthorizationPage();
    let homePage = new HomePage();
    let email = 'ssls.automation+5@gmail.com';
    let password = '123456';
    let homeUrl = 'https://www.ssls.com/';
    let authorizationUrl = 'https://www.ssls.com/authorize';

    afterAll(function() {
        baseTest.clearLocalStorage();
    });

    it('should open home page', function() {
        baseTest.openPage('/');
        expect(browser.getCurrentUrl()).toEqual(homeUrl);
    });

    it('should open authorization page', function() {
        baseTest.openPage('/');
        homePage.btnLogIn.click();
        expect(browser.getCurrentUrl()).toEqual(authorizationUrl);
    });

    it('should show password after click on eye icon', function() {
        baseTest.openPage('/');
        homePage.btnLogIn.click();
        authorizationPage.iptEmail.clear().sendKeys(email);
        authorizationPage.iptPassword.clear().sendKeys(password);
        authorizationPage.btnShowPassword.click();
        expect(authorizationPage.iptPassword.getAttribute('type')).toEqual('text');
        expect(authorizationPage.iptPassword.getAttribute('value')).toEqual(password);
    });

    it('should change Login button to dropdown menu with text user email', function() {
        baseTest.openPage('/');
        homePage.btnLogIn.click();
        authorizationPage.login(email, password);
        expect(element(by.cssContainingText('.user-btn', email)).isDisplayed()).toBeTruthy();
    });
});

describe('Authorization page.Not registered user', function() {
    let baseTest = new BaseTest();
    let authorizationPage = new AuthorizationPage();
    let homePage = new HomePage();
    let email = 'ssl.automation+5@gmail.com';
    let password = '1234';
    let homeUrl = 'https://www.ssls.com/';
    let authorizationUrl = 'https://www.ssls.com/authorize';
    let textError = 'Uh oh! Email or password is incorrect';
    let EC = protractor.ExpectedConditions;

    afterAll(function() {
        baseTest.clearLocalStorage();
    });

    it('should open home page', function() {
        baseTest.openPage('/');
        expect(browser.getCurrentUrl()).toEqual(homeUrl);
    });

    it('should open authorization page', function() {
        baseTest.openPage('/');
        homePage.btnLogIn.click();
        expect(browser.getCurrentUrl()).toEqual(authorizationUrl);
    });

    it('should show password after click on eye icon', function() {
        baseTest.openPage('/');
        homePage.btnLogIn.click();
        authorizationPage.iptEmail.clear().sendKeys(email);
        authorizationPage.iptPassword.clear().sendKeys(password);
        authorizationPage.btnShowPassword.click();
        expect(authorizationPage.iptPassword.getAttribute('type')).toEqual('text');
        expect(authorizationPage.iptPassword.getAttribute('value')).toEqual(password);
    });

    it('should show error messages if user not registered ', function() {
        baseTest.openPage('/');
        homePage.btnLogIn.click();
        authorizationPage.login(email, password);
        browser.wait(EC.visibilityOf(authorizationPage.msgNotification), 5000);
        expect(authorizationPage.msgNotification.getText()).toEqual(textError);
    });
});

describe('Authorization page. Invalid email', function() {
    let baseTest = new BaseTest();
    let authorizationPage = new AuthorizationPage();
    let homePage = new HomePage();
    let email = 'ssl.automation+5@@gmail.com';
    let password = '123456';
    let homeUrl = 'https://www.ssls.com/';
    let authorizationUrl = 'https://www.ssls.com/authorize';
    let textError = 'Uh oh! This\nisn’t an email';
    let EC = protractor.ExpectedConditions;

    afterAll(function() {
        baseTest.clearLocalStorage();
    });

    it('should open home page', function() {
        baseTest.openPage('/');
        expect(browser.getCurrentUrl()).toEqual(homeUrl);
    });

    it('should open authorization page', function() {
        baseTest.openPage('/');
        homePage.btnLogIn.click();
        expect(browser.getCurrentUrl()).toEqual(authorizationUrl);
    });

    it('should show password after click on eye icon', function() {
        baseTest.openPage('/');
        homePage.btnLogIn.click();
        authorizationPage.iptEmail.clear().sendKeys(email);
        authorizationPage.iptPassword.clear().sendKeys(password);
        authorizationPage.btnShowPassword.click();
        expect(authorizationPage.iptPassword.getAttribute('type')).toEqual('text');
        expect(authorizationPage.iptPassword.getAttribute('value')).toEqual(password);
    });

    it('should show error messages if user type invalid email', function() {
        baseTest.openPage('/');
        homePage.btnLogIn.click();
        authorizationPage.login(email, password);
        browser.wait(EC.visibilityOf(authorizationPage.msgTooltipNotificationInvalidEmail), 5000);
        expect(authorizationPage.msgTooltipNotificationInvalidEmail.getText()).toEqual(textError);
    });
});

describe('Authorization page. Empty fields', function() {
    let baseTest = new BaseTest();
    let authorizationPage = new AuthorizationPage();
    let homePage = new HomePage();
    let email = '';
    let password = '';
    let homeUrl = 'https://www.ssls.com/';
    let authorizationUrl = 'https://www.ssls.com/authorize';
    let textErrorEmptyEmail = 'Oops, please\nenter your email';
    let textErrorEmptyPassword = 'Looks like you’ve\nmissed this one';
    let EC = protractor.ExpectedConditions;

    afterAll(function() {
        baseTest.clearLocalStorage();
    });

    it('should open home page', function() {
        baseTest.openPage('/');
        expect(browser.getCurrentUrl()).toEqual(homeUrl);
    });

    it('should open authorization page', function() {
        baseTest.openPage('/');
        homePage.btnLogIn.click();
        expect(browser.getCurrentUrl()).toEqual(authorizationUrl);
    });

    it('should show error messages if user not filled email and password fields', function() {
        baseTest.openPage('/');
        homePage.btnLogIn.click();
        authorizationPage.login(email, password);
        browser.wait(EC.visibilityOf(authorizationPage.msgTooltipNotificationEmptyEmail), 5000);
        browser.wait(EC.visibilityOf(authorizationPage.msgTooltipNotificationEmptyPassword), 5000);
        expect(authorizationPage.msgTooltipNotificationEmptyEmail.getText()).toEqual(textErrorEmptyEmail);
        expect(authorizationPage.msgTooltipNotificationEmptyPassword.getText()).toEqual(textErrorEmptyPassword);
    });
});