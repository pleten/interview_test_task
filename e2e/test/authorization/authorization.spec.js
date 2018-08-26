let authorizationData       = require('../../data/authorization/index.js');
let commonHelper            = require('./../../services/helpers/common.helper.js');
let authorizationPage       = require('../../services/authorization/authorization.po.js');
let homePage                = require('./../../services/home_page/home_page.po.js');
let homeData                = require('./../../data/home_page/index.js');

describe('Authorization page scenarios', function () {

    let homePageUrl = homeData.url;
    let email = authorizationData.email;
    let password = authorizationData.password;

    describe('Authorization page (Welcome back!)', function () {

        afterAll(function () {
            commonHelper.clearAllData();
        });

        it('should redirect to home page', function () {
            browser.get(homePageUrl);
        });

        it('should see limited time offer text', function () {
            commonHelper.waitUntilTextInElement(homePage.textLimited, homeData.limited_title);
        });

        it('should click on "LOG IN" text', function () {
            homePage.clickLogin();
        });

        it('should see authorization page title', function () {
            commonHelper.waitUntilTextInElement(authorizationPage.textPageTitle, authorizationData.title);
        });

        it('should enter valid email and password', function () {
            authorizationPage.fillLogin(email);
            authorizationPage.fillPassword(password);
        });

        it('should see password field type as password', function () {
            authorizationPage.seePasswordFieldType(authorizationData.passwordType.password);
        });

        it('should click eye button', function () {
            authorizationPage.clickEye();
        });

        it('should see password field type as text', function () {
            authorizationPage.seePasswordFieldType(authorizationData.passwordType.text);
        });

        it('should click login button', function () {
            authorizationPage.clickLogin();
        });

        it('should not see home page login button', function () {
            commonHelper.waitUntilElementIsNotPresent(homePage.buttonLogin);
        });

        it('should see profile dropdown', function () {
            commonHelper.waitUntilElementVisible(homePage.dropdownMenuProfile);
        });

        it('should see certificates button with email address', function () {
            commonHelper.waitUntilTextInElement(homePage.buttonCertificates, email);
        });
    });

    describe('Authorization page. Not registered user', function () {

        afterAll(function () {
            commonHelper.clearAllData();
        });

        it('should redirect to home page', function () {
            browser.get(homePageUrl);
        });

        it('should see limited time offer text', function () {
            commonHelper.waitUntilTextInElement(homePage.textLimited, homeData.limited_title);
        });

        it('should click on "LOG IN" text', function () {
            homePage.clickLogin();
        });

        it('should see authorization page title', function () {
            commonHelper.waitUntilTextInElement(authorizationPage.textPageTitle, authorizationData.title);
        });

        it('should enter incorrect email and password', function () {
            authorizationPage.fillLogin(authorizationData.wrongData.incorrectEmail);
            authorizationPage.fillPassword(authorizationData.wrongData.incorrectPassword);
        });

        it('should see password field type as password', function () {
            authorizationPage.seePasswordFieldType(authorizationData.passwordType.password);
        });

        it('should click eye button', function () {
            authorizationPage.clickEye();
        });

        it('should see password field type as text', function () {
            authorizationPage.seePasswordFieldType(authorizationData.passwordType.text);
        });

        it('should click login button', function () {
            authorizationPage.clickLogin();
        });

        it('should see error notify that email or password is incorrect', function () {
            commonHelper.waitUntilTextInElement(authorizationPage.errorNotify, authorizationData.errors.incorrectEmailOrPassword);
        });
    });

    describe('Authorization page. Invalid email', function () {

        afterAll(function () {
            commonHelper.clearAllData();
        });

        it('should redirect to home page', function () {
            browser.get(homePageUrl);
        });

        it('should see limited time offer text', function () {
            commonHelper.waitUntilTextInElement(homePage.textLimited, homeData.limited_title);
        });

        it('should click on "LOG IN" text', function () {
            homePage.clickLogin();
        });

        it('should see authorization page title', function () {
            commonHelper.waitUntilTextInElement(authorizationPage.textPageTitle, authorizationData.title);
        });

        it('should enter invalid email and correct password', function () {
            authorizationPage.fillLogin(authorizationData.wrongData.notEmail);
            authorizationPage.fillPassword(authorizationData.password);
        });

        it('should see password field type as password', function () {
            authorizationPage.seePasswordFieldType(authorizationData.passwordType.password);
        });

        it('should click eye button', function () {
            authorizationPage.clickEye();
        });

        it('should see password field type as text', function () {
            authorizationPage.seePasswordFieldType(authorizationData.passwordType.text);
        });

        it('should click login button', function () {
            authorizationPage.clickLogin();
        });

        it('should see error notify that email is not email', function () {
            authorizationPage.getFieldInvalidErrorText(authorizationData.fields.email).then(function (value) {
                expect(value).toEqual(authorizationData.errors.notEmail);
            });
        });
    });

    describe('Authorization page. Empty fields', function () {

        afterAll(function () {
            commonHelper.clearAllData();
        });

        it('should redirect to home page', function () {
            browser.get(homePageUrl);
        });

        it('should see limited time offer text', function () {
            commonHelper.waitUntilTextInElement(homePage.textLimited, homeData.limited_title);
        });

        it('should click on "LOG IN" text', function () {
            homePage.clickLogin();
        });

        it('should see authorization page title', function () {
            commonHelper.waitUntilTextInElement(authorizationPage.textPageTitle, authorizationData.title);
        });

        it('should click login button', function () {
            authorizationPage.clickLogin();
        });

        it('should see error notify that email is required', function () {
            authorizationPage.getFieldRequiredErrorText(authorizationData.fields.email).then(function (value) {
                expect(value).toEqual(authorizationData.errors.emailRequired);
            });
        });

        it('should see error notify that password is required', function () {
            authorizationPage.getFieldRequiredErrorText(authorizationData.fields.password).then(function (value) {
                expect(value).toEqual(authorizationData.errors.passwordRequired);
            });
        });
    });

    describe('Log Out', function () {

        afterAll(function () {
            commonHelper.clearAllData();
        });

        it('should redirect to home page', function () {
            browser.get(homePageUrl);
        });

        it('should see limited time offer text', function () {
            commonHelper.waitUntilTextInElement(homePage.textLimited, homeData.limited_title);
        });

        it('should click on "LOG IN" text', function () {
            homePage.clickLogin();
        });

        it('should see authorization page title', function () {
            commonHelper.waitUntilTextInElement(authorizationPage.textPageTitle, authorizationData.title);
        });

        it('should enter valid email and password', function () {
            authorizationPage.fillLogin(email);
            authorizationPage.fillPassword(password);
        });

        it('should click login button', function () {
            authorizationPage.clickLogin();
        });

        it('should see profile dropdown', function () {
            commonHelper.waitUntilElementVisible(homePage.dropdownMenuProfile);
        });

        it('should see certificates button with email address', function () {
            commonHelper.waitUntilTextInElement(homePage.buttonCertificates, email);
        });

        it('should logout from profile', function () {
            homePage.logOut();
        });

        it('should see login button', function () {
            commonHelper.waitUntilElementVisible(homePage.buttonLogin);
        });

        it('should see correct current url address', function () {
            expect(browser.getCurrentUrl()).toEqual(authorizationData.url);
        });
    });
});