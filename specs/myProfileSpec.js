var Home = require('../pages/homePage');
var Login = require('../pages/loginPage');
var Profile = require('../pages/profilePage');
var UserDropDown = require('../pageFragments/userDropDown');
var testData = require('../testData');

describe('My Profile page', function () {

    var homePage;
    var loginPage;
    var profilePage;
    var userDropDown;

    beforeEach(async function () {
        homePage = await new Home();
        loginPage = await new Login();
        profilePage = await new Profile();
        userDropDown = await new UserDropDown();

        await browser.get(testData.url);
    });

    it('Client area', async function () {

        await homePage.clickLoginButton();
        await loginPage.enterEmail(testData.validEmail);
        await loginPage.enterPassword(testData.validPassword);
        await loginPage.clickLoginButton();
        await userDropDown.viewProfile();
        var preconditionsProfileDetails = await profilePage.getProfileDetails();
        await userDropDown.logOut();

        await homePage.clickLoginButton();
        await loginPage.enterEmail(testData.validEmail);
        await loginPage.enterPassword(testData.validPassword);
        await loginPage.clickLoginButton();
        await userDropDown.viewProfile();
        var actualProfileDetails = await profilePage.getProfileDetails();

        for (var key in preconditionsProfileDetails) {
            expect(preconditionsProfileDetails[key]).toEqual(actualProfileDetails[key]);
        }
    });

    it('Refresh support pin', async function () {

        await homePage.clickLoginButton();
        await loginPage.enterEmail(testData.validEmail);
        await loginPage.enterPassword(testData.validPassword);
        await loginPage.clickLoginButton();
        await userDropDown.viewProfile();
        var before = await profilePage.getProfileDetails();
        profilePage.updateSupportPin();
        var after = await profilePage.getProfileDetails();

        expect(before.supportPin).not.toEqual(after.supportPin);
    });
});