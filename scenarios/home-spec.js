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
    });

    it('Home page. Filters', async function() {
        await I.getNumberOfSslItems("personal");
        await I.getNumberOfSslItems("multiDomain");
        I.selectFilter("Personal");
        I.checkNumberOfSslItems("personal");
        I.unSelectFilter("Personal");
        I.selectFilter("multi-domain");
        I.checkNumberOfSslItems("multiDomain");
    });

    afterEach(function() {
        I.clearBrowserData();
    });
});