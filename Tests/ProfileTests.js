'use strict';

let BaseTest = require('../Tests/BaseTest');
let BasePage = require('../Pages/BasePage');
let AuthorizationPage = require('../Pages/AuthorizationPage');
let HomePage = require('../Pages/HomePage');
let ProfilePage = require('../Pages/ProfilePage');

describe('My profile page. Client area', function() {
    let baseTest = new BaseTest();
    let basePage = new BasePage();
    let authorizationPage = new AuthorizationPage();
    let homePage = new HomePage();
    let profilePage = new ProfilePage();
    let email = 'ssls.automation+5@gmail.com';
    let password = '123456';
    let userProfileUrl = 'https://www.ssls.com/user/profile';
    let usernameProfile;
    let phoneProfile;
    let addressProfile;
    let newsletterProfile;

    beforeAll(function() {
        baseTest.openPage('/');
        homePage.btnLogIn.click();
        authorizationPage.login(email, password);
        basePage.viewProfile();
        usernameProfile = profilePage.lblName.getText();
        phoneProfile = profilePage.lblPhone.getText();
        addressProfile = profilePage.lblAddress.getText();
        newsletterProfile = profilePage.tgbtnNewsletter.getAttribute('class');
        basePage.logout();
    });

    afterAll(function() {
        baseTest.clearLocalStorage();
    });

    it('should open user profile page', function() {
        baseTest.openPage('/');
        homePage.btnLogIn.click();
        authorizationPage.login(email, password);
        basePage.viewProfile();
        expect(browser.getCurrentUrl()).toEqual(userProfileUrl);
        baseTest.clearLocalStorage();
    });

    it('should contains values and compare with values from precondition', function() {
        baseTest.openPage('/');
        homePage.btnLogIn.click();
        authorizationPage.login(email, password);
        basePage.viewProfile();
        expect(profilePage.lblName.getText()).toEqual(usernameProfile);
        expect(profilePage.lblEmail.getText()).toEqual(email);
        expect(profilePage.lblPhone.getText()).toEqual(phoneProfile);
        expect(profilePage.lblAddress.getText()).toEqual(addressProfile);
        expect(profilePage.tgbtnNewsletter.getAttribute('class')).toEqual(newsletterProfile);
    });
});

describe('My profile page. Refresh support pin', function() {
    let baseTest = new BaseTest();
    let basePage = new BasePage();
    let authorizationPage = new AuthorizationPage();
    let homePage = new HomePage();
    let profilePage = new ProfilePage();
    let email = 'ssls.automation+5@gmail.com';
    let password = '123456';
    let pinProfile;

    beforeAll(function() {
        baseTest.openPage('/');
        homePage.btnLogIn.click();
        authorizationPage.login(email, password);
    });

    afterAll(function() {
        baseTest.clearLocalStorage();
    });

    it('should refresh support pin', function() {
        basePage.viewProfile();
        pinProfile = profilePage.lblPin.getText();
        profilePage.btnUpdatePin.click();
        expect(profilePage.lblPin.getText()).not.toEqual(pinProfile);
    });
});