const pageObject = require('./../../services/pages').container.PageObject;
const abstractPage = pageObject.getAbstractPage();
const loginPage = pageObject.getLoginPage();
const profilePage = pageObject.getProfilePage();
const data = require('../../data/index.js');
const commonHelper = require('./../../helpers/common.helper.js');

describe('PROFILE TESTS', function () {

    const email = data.userLogin.email;
    const password = data.userLogin.password;

    describe('checking CLIENT AREA', function () {

        it('should SAVE USER PROFILE INFO', async function () {
            await browser.get(browser.baseUrl);
            await abstractPage.openLoginForm();
            await loginPage.login(email, password);
            await profilePage.getProfileInfo();
            await abstractPage.logout();
        });

        it('should see SAME USER PROFILE INFO', function () {
            loginPage.login(email, password);
            abstractPage.openViewProfile();

            expect(profilePage.txtName.getText()).toEqual(profileInfo.name);
            expect(profilePage.txtEmail.getText()).toEqual(profileInfo.email);
            expect(profilePage.txtPassword.getText()).toEqual(profileInfo.password);
            expect(profilePage.txtPhone.getText()).toEqual(profileInfo.phone);
            expect(profilePage.txtAddress.getText()).toEqual(profileInfo.address);
            expect(profilePage.txtSupportPin.getText()).toEqual(profileInfo.pin);
            expect(profilePage.txtNewsletter.getAttribute('class')).toEqual(profileInfo.newsletter);

            abstractPage.logout();
        });
    });

    describe('checking SUPPORT PIN update', function () {
        it('should see LOGGED USER', function () {
            loginPage.login(email, password);
        });

        it('should UPDATE SUPPORT PIN', async function () {
            await profilePage.getSupportPin();
            await profilePage.updateSupportPin();

            await expect(profilePage.txtSupportPin.getText).not.toEqual(preSupportPin);
        });
    })
});
