import { AuthorizationPage } from "../pages/authorization_page.po";
import { ProfilePage } from "../pages/profile_page.po";

describe('Refresh supporting page.', () => {

    let authorizationPage = new AuthorizationPage();
    let profilePage = new ProfilePage();
    let currentSupportPin: string;

    beforeAll(() => authorizationPage.navigateAndlogIn());

    afterAll( () => authorizationPage.logOut());

    it('Refresh support pin', () => {
        authorizationPage.dropBtnAndViewProfileClick();

        profilePage.supportPinValue.getText().then((pin) => currentSupportPin = pin);
        profilePage.supportPinButton.click();

        expect(profilePage.supportPinValue.getText()).not.toEqual(currentSupportPin);
        expect(profilePage.supportPinValue.getText()).not.toBe(null);
    });
});