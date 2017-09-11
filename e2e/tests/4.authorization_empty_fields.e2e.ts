import { MainPage } from "../pages/main_page.po"
import { AuthorizationPage } from "../pages/authorization_page.po";
import { browser } from "protractor";

describe('Log in with empty filds', () => {

    let mainPage:MainPage = new MainPage();
    let authorizationPage:AuthorizationPage = new AuthorizationPage();

    it('Open home page', () => {
        mainPage.navigateTo();

        expect(browser.getCurrentUrl()).toEqual('https://www.ssls.com/');
    });

    it('Go to authorization page', () => {
        mainPage.logInBtnClick();

        expect(browser.getCurrentUrl()).toEqual('https://www.ssls.com/authorize');
        expect(authorizationPage.title.isDisplayed()).toBeTruthy();
    });

    it('Fields email and password are empty', () => {
        authorizationPage.loginBtnClick();

        expect(authorizationPage.emptyEmailMsg.getText()).toEqual('Oops, please\nenter your email');
        expect(authorizationPage.emptyPasswordMsg.getText()).toEqual('Looks like you’ve\nmissed this one');
    });
});
