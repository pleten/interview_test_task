let I = require('../mainSteps');
let data = require(`./testData`);

describe('Header tests', function() {
    beforeEach(function () {
        I.openUrl();
        I.seeHomePage();
        I.openLoginPage();
        I.seeLoginPage();
        I.fillLoginData(data.validUser, true, false);
        I.checkLoggedIn(data.validUser.email);
    });

    it('Log Out', function() {
        I.logOut();
        I.seeUrl('authorize');
    });

    afterEach(function() {
        I.clearBrowserData();
    });
});