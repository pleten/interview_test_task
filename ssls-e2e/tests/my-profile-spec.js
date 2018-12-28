let autorizationPage = require('../page-objects/autorization-page');
let headerPage = require('../page-objects/header-page');
let applicationTestData = require('../data');
let myProfilePage = require('../page-objects/my-profile-page');
let commonPage = require('../page-objects/common-page');

describe('My profile page', function () {

    beforeEach(function () {
        browser.get(applicationTestData.baseUrl);
        headerPage.clickLogInText();
        autorizationPage.fillLogInForm(applicationTestData.credentials.email, applicationTestData.credentials.password);
        autorizationPage.clickLogInButton();
        headerPage.choseOptionInUserDropDown('View profile');
    });

    afterEach(function () {
        commonPage.refreshBrowser();
    });

    it('Client area (editing profile information)', async function () {

        console.log('I get old values');
        headerPage.choseOptionInUserDropDown('View profile');
        let valuesForPrecondition = await myProfilePage.profileValues.getText();
        headerPage.choseOptionInUserDropDown('Log out');

        console.log('Log in');
        autorizationPage.fillLogInForm(applicationTestData.credentials.email, applicationTestData.credentials.password);
        autorizationPage.clickLogInButton();

        console.log('After click on "View profile" opened page "Profile" should be displayed');
        headerPage.choseOptionInUserDropDown('View profile');
        expect(await browser.getCurrentUrl()).toEqual('https://www.ssls.com/user/profile');

        console.log('Check that opened page has to contain values in the next fields and compare with values from precondition');
        expect(await myProfilePage.profileValues.getText()).toEqual(valuesForPrecondition);
    });

    it('Refresh support pin', async function () {

        console.log('After click on “Update” button, support pin should be updated.');
        let oldSupportPin = await myProfilePage.getSupportPin();
        myProfilePage.clickRefreshSupportPin();
        expect(oldSupportPin).not.toEqual(await myProfilePage.getSupportPin());
    });
});