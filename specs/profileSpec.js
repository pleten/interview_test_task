import HomePage from '../pages/homePage';
import AuthPage from '../pages/authPage';
import ProfilePage from '../pages/profilePage';
import testData from '../data/testData';

describe('Tests for the \'My profile page\' page', function() {

    beforeEach(function() {
        HomePage.open();
        HomePage.btnLogin.click();
        AuthPage.titleIs(AuthPage.title);
        AuthPage.login(testData.validEmail, testData.validPass);
    });
    
    it('Test: Client area', function() {
        HomePage.btnOpenUserDropdown.click();
        HomePage.btnViewProfile.click();
        ProfilePage.titleIs(ProfilePage.title);
        var preProfileValues = ProfilePage.getProfileValues();
        HomePage.logout();
        AuthPage.titleIs(AuthPage.title);
        AuthPage.login(testData.validEmail, testData.validPass);
        HomePage.btnOpenUserDropdown.click();
        HomePage.btnViewProfile.click();
        ProfilePage.titleIs(ProfilePage.title);
        expect(browser.getTitle()).toEqual(ProfilePage.title);
        var actProfileValues = ProfilePage.getProfileValues();
        for (var index in preProfileValues) {
            expect(preProfileValues[index]).toEqual(actProfileValues[index]);
        }
    });

    it('Test: Refresh support pin', function() {
        HomePage.btnOpenUserDropdown.click();
        HomePage.btnViewProfile.click();
        ProfilePage.titleIs(ProfilePage.title);
        var supportPinBeforeUpd = ProfilePage.valueSupportPin.getText();
        ProfilePage.btnUpdSupportPin.click();
        var supportPinAfterUpd = ProfilePage.valueSupportPin.getText();
        expect(supportPinAfterUpd).not.toEqual(supportPinBeforeUpd);
    });

    afterEach(function() {
        ProfilePage.clearBrowserStorage();
    });
       

});