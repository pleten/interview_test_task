import { $, browser } from 'protractor';
import { LoginPage } from '../shared/login-page.po';
import { HeaderPage } from '../shared/header-page.po';
import { AppCredentials } from '../shared/app-credentials';
import { AbstractPage } from '../shared/abstract-page.po';

describe('Authorization page', () => {

    beforeAll(() => {
        browser.get(AppCredentials.baseURL);
    });

    afterEach(() => {
        browser.get(AppCredentials.baseURL);
    });

    it('First and fifth tasks: Welcome back and Log Out', () => {
        // check that we are on the home page
        expect(browser.getCurrentUrl()).toContain(AppCredentials.baseURL);

        HeaderPage.buttonLogIn.click();
        // check that we are on authorize page
        expect(browser.getCurrentUrl()).toContain('authorize');

        LoginPage.inputLogin.sendKeys(AppCredentials.userID);
        LoginPage.inputPassword.sendKeys(AppCredentials.userPassword);
        $('.icon-eye').click();
        // check that the password displayed as text
        expect(LoginPage.inputPassword.getAttribute('type')).toContain('text');

        LoginPage.buttonLogIn.click();
        // check that we are on the home page
        expect(browser.getCurrentUrl()).toContain(AppCredentials.baseURL);
        // check name at profile button
        expect(HeaderPage.buttonProfileName.getText()).toContain(AppCredentials.userID);
        // check that dropdown button displayed
        expect(HeaderPage.dropdownProfile.isDisplayed()).toBeTruthy();

        HeaderPage.dropdownProfile.click();
        HeaderPage.buttonLogout.click();
        // check that user redirected to login page
        expect(browser.getCurrentUrl()).toContain('authorize');
    });

    it('Not registered user', () => {
        // check that we are on the home page
        expect(browser.getCurrentUrl()).toContain(AppCredentials.baseURL);

        HeaderPage.buttonLogIn.click();
        // check that we are on authorize page
        expect(browser.getCurrentUrl()).toContain('authorize');

        LoginPage.inputLogin.sendKeys('test@test.test');
        LoginPage.inputPassword.sendKeys('somePassword');
        $('.icon-eye').click();
        // check that the password displayed as text
        expect(LoginPage.inputPassword.getAttribute('type')).toContain('text');

        LoginPage.buttonLogIn.click();
        // waiting for alert
        browser.wait(AbstractPage.getEC().visibilityOf(LoginPage.alertInvalidCredentials), 2000);
        // check text in alert
        expect(LoginPage.alertInvalidCredentials.getText()).toContain('Uh oh! Email or password is incorrect');
    });

    it('Invalid Email', () => {
        // check that we are on the home page
        expect(browser.getCurrentUrl()).toContain(AppCredentials.baseURL);

        HeaderPage.buttonLogIn.click();
        // check that we are on authorize page
        expect(browser.getCurrentUrl()).toContain('authorize');

        LoginPage.inputLogin.sendKeys('test');
        LoginPage.inputPassword.sendKeys(AppCredentials.userPassword);
        $('.icon-eye').click();
        // check that the password displayed as text
        expect(LoginPage.inputPassword.getAttribute('type')).toContain('text');

        LoginPage.buttonLogIn.click();
        // check tooltip error for incorrect email
        expect(LoginPage.tooltipIncorrectEmail.getText()).toContain('Uh oh! This' + `\n` + 'isn’t an email');
    });

    it('Empty Fields', () => {
        // check that we are on the home page
        expect(browser.getCurrentUrl()).toContain(AppCredentials.baseURL);

        HeaderPage.buttonLogIn.click();
        // check that we are on authorize page
        expect(browser.getCurrentUrl()).toContain('authorize');

        LoginPage.buttonLogIn.click();
        // check tooltip error for incorrect mail and password
        expect(LoginPage.tooltipEmptyEmail.getText()).toContain('Oops, please' + `\n` + 'enter your email');
        expect(LoginPage.tooltipEmptyPassword.getText()).toContain('Looks like you’ve' + `\n` + 'missed this one');
    });

});
