let I = require('../mainSteps');
let data = require(`./testData`);

describe('Profile tests', function() {
    beforeEach(function () {
        I.openUrl();
        I.seeHomePage();
        I.openLoginPage();
        I.seeLoginPage();
        I.fillLoginData(data.validUser, true, false);
        I.checkLoggedIn(data.validUser.email);
        I.openProfile();
    });

    it('My profile page. Client area', function() {
        I.getProfileData();
        I.logOut();
        I.seeLoginPage();
        I.fillLoginData(data.validUser, true, false);
        I.checkLoggedIn(data.validUser.email);
        I.openProfile();
        I.checkAdditionalProfileData(data.additionalUserData);
    });

    it('My profile page. Refresh support pin', function() {
        I.getCurrentPin();
        I.generateNewPin();
        I.checkPinChanged();
    });

    afterEach(function() {
        I.clearBrowserData();
    });
});