import { MainPage } from "../pages/main_page.po"
import { AuthorizationPage } from "../pages/authorization_page.po";
import { browser, protractor } from "protractor";

describe('Log in for registered user', () => {

    let mainPage: MainPage = new MainPage();
    let authorizationPage: AuthorizationPage = new AuthorizationPage();
    const email: string = 'ssls.automation+5@gmail.com';
    const password: string = '123456';

    afterAll(() => {
        protractor.browser.manage().deleteAllCookies();
    });

    it('Open home page', () => {
        mainPage.navigateTo();

        expect(browser.getCurrentUrl()).toEqual('https://www.ssls.com/');
    });

    it('Go to authorization page', () => {
        mainPage.logInBtnClick();

        expect(browser.getCurrentUrl()).toEqual('https://www.ssls.com/authorize');
        expect(authorizationPage.title.isDisplayed()).toBeTruthy();
    });

    it('Enter valid email and password for previously registered user', () => {
        authorizationPage.fillEmailPassFields(email, password);
        authorizationPage.iconEye.click();

        expect(authorizationPage.inputPassword.getAttribute('type')).toEqual('text');
        expect(authorizationPage.inputPassword.getAttribute('value')).toEqual(password);
        expect(authorizationPage.inputPassword.isDisplayed()).toBeTruthy();
    });

    it('Login as regisered user', () => {
        authorizationPage.loginBtnClick();

        expect(authorizationPage.userEmailBtn.getText()).toEqual(email);
    });
});
