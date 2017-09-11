import { AuthorizationPage } from "../pages/authorization_page.po";
import { browser } from "protractor";
import { ProfilePage } from "../pages/profile_page.po";

describe('Check profile. Client page.', () => {

    let authorizationPage: AuthorizationPage = new AuthorizationPage();
    let profilePage: ProfilePage = new ProfilePage();
    let currentName, currentEmail, currentPhone, currentAddress, currentSupportPin, currentStateNewsletter;

    beforeAll(() => {
        authorizationPage.navigateAndlogIn();
        profilePage.navigateTo();

        profilePage.getFieldText('name').then((text) => currentName = text);
        profilePage.getFieldText('email').then((email) => currentEmail = email);
        profilePage.getFieldText('phone').then((phone) => currentPhone = phone);
        profilePage.getFieldText('address').then((address) => currentAddress = address);
        profilePage.supportPinValue.getText().then((pin) => currentSupportPin = pin);
        profilePage.newsletterBtn.getAttribute('class').then((className) => currentStateNewsletter = className);

        authorizationPage.logOut();
    });

    afterAll(() => authorizationPage.logOut());

    it('Check values in profile', () => {
        authorizationPage.navigateAndlogIn();
        authorizationPage.dropBtnAndViewProfileClick();

        expect(browser.getCurrentUrl()).toEqual('https://www.ssls.com/user/profile');
        expect(profilePage.getFieldText('name')).toEqual(currentName);
        expect(profilePage.getFieldText('email')).toEqual(currentEmail);
        expect(profilePage.getFieldText('password')).not.toBe(null);
        expect(profilePage.getFieldText('phone')).toEqual(currentPhone);
        expect(profilePage.supportPinValue.getText()).toEqual(currentSupportPin);
        expect(profilePage.newsletterBtn.getAttribute('class')).toEqual(currentStateNewsletter);
    });
});
