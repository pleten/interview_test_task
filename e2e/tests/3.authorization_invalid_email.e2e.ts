import {MainPage} from "../pages/main_page.po"
import {AuthorizationPage} from "../pages/authorization_page.po";
import {browser} from "protractor";

describe('Log in with invalid email', () => {

    let mainPage:MainPage = new MainPage();
    let authorizationPage:AuthorizationPage = new AuthorizationPage();
    const email:string = 'any@@gmail.com';
    const password:string = '123456';

    it('Open home page', () => {
        mainPage.navigateTo();

        expect(browser.getCurrentUrl()).toEqual('https://www.ssls.com/');
    });

    it('Go to authorization page', () => {
        mainPage.logInBtnClick();

        expect(browser.getCurrentUrl()).toEqual('https://www.ssls.com/authorize');
        expect(authorizationPage.title.isDisplayed()).toBeTruthy();
    });

    it('Enter invalid email and valid password for previously registered user', () => {
        authorizationPage.fillEmailPassFields(email, password);
        authorizationPage.iconEye.click();

        expect(authorizationPage.inputPassword.getAttribute('type')).toEqual('text');
        expect(authorizationPage.inputPassword.getAttribute('value')).toEqual(password);
        expect(authorizationPage.inputPassword.isDisplayed()).toBeTruthy();
    });

    it('Show error message for incorrect email', () => {
        authorizationPage.loginBtnClick();

        expect(authorizationPage.wrongTypeEmailMsg.getText()).toEqual('Uh oh! This\nisn’t an email');
    });
});
