import { AuthorizationPage } from "../pages/authorization_page.po";
import { browser } from "protractor";

describe('Log out', () => {

    let authorizationPage: AuthorizationPage = new AuthorizationPage();

    beforeAll(() => authorizationPage.navigateAndlogIn());

    it('Log out. Return to authorization page.', () => {
        authorizationPage.logOut();

        expect(authorizationPage.userEmailBtn.isPresent()).toBeFalsy();
        expect(browser.getCurrentUrl()).toEqual('https://www.ssls.com/authorize');
    });
});
