let HomePage = require('../pages/homePage.js');
let LoginPage = require('../pages/loginPage.js');
let ProfilePage = require('../pages/userProfilePage');
let userData = require('../data/userData');
let isEqual = require('lodash.isequal');


describe('Protractor Demo App', function() {

    beforeEach(() => {
        HomePage.get();
        HomePage.openLoginPage();
        LoginPage.login(userData.testUser.email, userData.testUser.password);
        HomePage.openProfilePage();
    });

    afterEach(function() {
        browser.driver.manage().deleteAllCookies();
    });

    it('My profile page. Client area', async () => {
        let profileBefore = await ProfilePage.getItemsObjects();
        HomePage.logout();
        LoginPage.login(userData.testUser.email, userData.testUser.password);
        HomePage.openProfilePage();
        let profileAfter = await ProfilePage.getItemsObjects();
        expect(isEqual(profileBefore, profileAfter)).toEqual(true);
    });

    it('My profile page. Refresh support pin', () => {
        let before = ProfilePage.getSupportPinValue();
        ProfilePage.updateSupportPin();
        let after = ProfilePage.getSupportPinValue();
        expect(before).not.toEqual(after);
    });
});