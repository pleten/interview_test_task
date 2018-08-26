let authorizationData       = require('../../data/authorization/index.js');
let commonHelper            = require('./../../services/helpers/common.helper.js');
let authorizationPage       = require('../../services/authorization/authorization.po.js');
let homePage                = require('./../../services/home_page/home_page.po.js');
let homeData                = require('./../../data/home_page/index.js');
let userProfilePage         = require('../../services/user_profile/user_profile.po.js');
let userProfileData         = require('./../../data/user_profile/index.js');

describe('My profile page scenarios', function () {

    let homePageUrl = homeData.url;
    let email = authorizationData.email;
    let password = authorizationData.password;

    describe('My profile page. Client area', function () {

        let tempNewsletterStatus;
        let tempData = {
            'name'       : '',
            'email'      : '',
            'password'   : '',
            'phone'      : '',
            'address'    : '',
            'pin': ''
        };

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

        it('should open user profile page', function () {
            homePage.openUserProfile();
        });

        it('should get all profile data', function () {
            Object.keys(tempData).forEach(function (key) {
                userProfilePage.getProfileRowValue(key).then(function (value) {
                    tempData[key] = value;
                });
            });
            userProfilePage.getNewsletterStatus().then(function (value) {
                tempNewsletterStatus = value;
            });
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

        it('should open user profile page', function () {
            homePage.openUserProfile();
        });

        it('should see all correct profile data', function () {
            Object.keys(tempData).forEach(function (key) {
                userProfilePage.getProfileRowValue(key).then(function (value) {
                    if(tempData[key] !== ''){
                        expect(tempData[key]).toEqual(value);
                    }
                    else throw key + ' data is empty';
                });
            });
            userProfilePage.getNewsletterStatus().then(function (value) {
                expect(tempNewsletterStatus).toEqual(value);
            });
        });
    });

    describe('My profile page. Refresh support pin', function () {

        let supportPin;

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

        it('should open user profile page', function () {
            homePage.openUserProfile();
        });

        it('should get user profile support pin', function () {
            userProfilePage.getProfileRowValue(userProfileData.rows.pin).then(function (value) {
                supportPin = value;
            });
        });

        it('should click update support pin field', function () {
            userProfilePage.clickUpdateSupportPin();
        });

        it('should wait for profile name field is disabled', function () {
            commonHelper.waitUntilElementVisible(userProfilePage.profileRowDisabled(userProfileData.rows.name));
        });

        it('should wait for profile name field is not disabled', function () {
            commonHelper.waitUntilElementIsNotPresent(userProfilePage.profileRowDisabled(userProfileData.rows.name));
        });

        it('should see not the same support pin', function () {
            userProfilePage.getProfileRowValue(userProfileData.rows.pin).then(function (value) {
                expect(value).not.toEqual(supportPin);
            });
        });
    });
});