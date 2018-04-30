const pageObject = require('./../../services/pages').container.PageObject;
const abstractPage = pageObject.getAbstractPage();
const loginPage = pageObject.getLoginPage();
const data = require('../../data/index.js');
const commonHelper = require('./../../helpers/common.helper.js');

describe('LOGIN TESTS', function () {

    const email = data.userLogin.email;
    const password = data.userLogin.password;
    const homepageUrl = data.url.homePageUrl;
    const autorizeUrl = data.url.autorizeUrl;
    const notRegEmail = data.userLogin.notRegisteredEmail;
    const invalidEmail = data.userLogin.invalidEmail;


    describe('checking LOGIN for REGISTERED USER', function () {

        it('should open MAIN page', function () {
            browser.get(browser.baseUrl);
            expect(abstractPage.btnLogIn.isDisplayed()).toBeTruthy();
            expect(browser.getCurrentUrl()).toEqual(homepageUrl);
        });

        it('should open LOGIN form', function () {
            abstractPage.openLoginForm();
            commonHelper.waitUntilElementVisible(loginPage.frmLogin);
            expect((loginPage.frmLogin).isDisplayed()).toBeTruthy();
        });

        it('should LOG IN as registered user', function () {
            loginPage.fillLoginForm(email, password);
            loginPage.showPassword();
            expect(loginPage.txtPassword.getAttribute('value')).toEqual(password);

            loginPage.submitLoginForm();
            commonHelper.waitUntilElementVisible(abstractPage.btnUser);
            expect(abstractPage.btnUser.getText()).toEqual(email);

            abstractPage.logout();
        });
    });

    describe('checking LOGIN for UNREGISTERED USER', function () {

        it('should open MAIN page', function () {
            browser.get(browser.baseUrl);
            expect(abstractPage.btnLogIn.isDisplayed()).toBeTruthy();
            expect(browser.getCurrentUrl()).toEqual(homepageUrl);
        });

        it('should open LOGIN form', function () {
            abstractPage.openLoginForm();
            expect((loginPage.frmLogin).isDisplayed()).toBeTruthy();
        });

        it('should see NOTIFICATION upon login as unregistered user', function () {
            loginPage.fillLoginForm(notRegEmail, password);
            loginPage.showPassword();
            expect(loginPage.txtPassword.getAttribute('value')).toEqual(password);

            loginPage.submitLoginForm();
            commonHelper.waitUntilElementVisible(abstractPage.notification);
            expect(abstractPage.notificationText.getText()).toEqual('Uh oh! Email or password is incorrect');
        });
    });

    describe('checking LOGIN with INVALID EMAIL', function () {

        it('should open MAIN page', function () {
            browser.get(browser.baseUrl);
            expect(abstractPage.btnLogIn.isDisplayed()).toBeTruthy();
            expect(browser.getCurrentUrl()).toEqual(homepageUrl);
        });

        it('should open LOGIN form', function () {
            abstractPage.openLoginForm();
            expect((loginPage.frmLogin).isDisplayed()).toBeTruthy();
        });

        it('should see ERROR about INVALID PASSWORD', async function () {
            loginPage.fillLoginForm(invalidEmail, password);
            loginPage.showPassword();
            await expect(loginPage.txtPassword.getAttribute('value')).toEqual(password);

            loginPage.submitLoginForm();
            commonHelper.waitUntilElementVisible(loginPage.invEmailTooltip);
            await expect(loginPage.invEmailTooltipText()).toEqual('Uh oh! This isn’t an email');
        });
    });

    describe('checking LOGIN without EMAIL & PASSWORD', function () {

        it('should open MAIN page', function () {
            browser.get(browser.baseUrl);
            expect(abstractPage.btnLogIn.isDisplayed()).toBeTruthy();
            expect(browser.getCurrentUrl()).toEqual(homepageUrl);
        });

        it('should open LOGIN form', function () {
            abstractPage.openLoginForm();
            expect((loginPage.frmLogin).isDisplayed()).toBeTruthy();
        });

        it('should see ERRORS about EMPTY EMAIL & PASSWORD', async function () {
            loginPage.fillLoginForm('', '');
            loginPage.submitLoginForm();

            commonHelper.waitUntilElementVisible(loginPage.emptyEmailTooltip);
            await expect(loginPage.emptyEmailTooltipText()).toEqual('Oops, please enter your email');

            expect(loginPage.errorPassTooltipText()).toEqual('Looks like you’ve missed this one');
        });
    });

    describe('checking LOGOUT for LOGGED USER', function () {

        it('should see logged user', function () {
            browser.get(browser.baseUrl);
            abstractPage.openLoginForm();
            loginPage.fillLoginForm(email, password);
            loginPage.submitLoginForm();
        });

        it('should LOG OUT & SEE LOGIN FORM', function () {
            commonHelper.waitUntilElementVisible(abstractPage.btnProfileMenu);
            abstractPage.logout();

            commonHelper.waitUntilUrlOpened(autorizeUrl);
            expect(browser.getCurrentUrl()).toEqual(autorizeUrl);
        });
    });
});
