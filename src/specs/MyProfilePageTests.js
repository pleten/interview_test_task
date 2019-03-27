import { openingHomePage } from '../functions/BaseFunctions';
import { at } from '../utils/PageFactory';
import basePage from '../pages/BasePage';
import { logInButton } from '../pages/HomePage';
import profilePage, {
    profileAddressField,
    profileEmailField,
    profileNameField,
    profileNewsletterField,
    profilePhoneField,
    profileSupportPINField, regeneratePinButton
} from '../pages/ProfilePage';
import authPage, {
    authLoginButton,
    emailField,
    logOutButton,
    passwordFieldPassword,
    profileDropdownButton,
    viewProfileLink
} from '../pages/AuthorizePage';
import { emailToLogin, passwordToLogin } from '../model/Credentials';

describe('"My profile page. Client area',() => {
    beforeEach('Login and going to profile page', () => {
        openingHomePage();
        at(basePage).clickingTheButton(logInButton)
            .inputToField(emailField, emailToLogin)
            .inputToField(passwordFieldPassword, passwordToLogin)
            .clickingTheButton(authLoginButton)
            .clickingTheButton(profileDropdownButton)
            .clickingTheButton(viewProfileLink);
    });

    afterEach('Cleaning browser session', () => {
        at(basePage).cleanBrowserSession();
    });

    it('Saving profile values, login out, login in second time and compere profile values ', () => {
        const profileNameInit = profilePage.gettingProfileFieldText(profileNameField);
        const profileEmailInit = profilePage.gettingProfileFieldText(profileEmailField);
        const profilePhoneInit = profilePage.gettingProfileFieldText(profilePhoneField);
        const profileAddressInit = profilePage.gettingProfileFieldText(profileAddressField);
        const profileSupportPINInit = profilePage.gettingProfileFieldText(profileSupportPINField);
        const profileNewsletterInit = profilePage.gettingProfileFieldText(profileNewsletterField);
        at(profilePage).clickingTheButton(profileDropdownButton)
            .clickingTheButton(logOutButton);
        at(authPage).inputToField(emailField, emailToLogin)
            .inputToField(passwordFieldPassword, passwordToLogin)
            .clickingTheButton(authLoginButton)
            .clickingTheButton(profileDropdownButton)
            .clickingTheButton(viewProfileLink);
        const profileNameSecond = profilePage.gettingProfileFieldText(profileNameField);
        const profileEmailSecond = profilePage.gettingProfileFieldText(profileEmailField);
        const profilePhoneSecond = profilePage.gettingProfileFieldText(profilePhoneField);
        const profileAddressSecond = profilePage.gettingProfileFieldText(profileAddressField);
        const profileSupportPINSecond = profilePage.gettingProfileFieldText(profileSupportPINField);
        const profileNewsletterSecond = profilePage.gettingProfileFieldText(profileNewsletterField);
        at(profilePage).verifyAttributeEqual(profileNameInit, profileNameSecond)
            .verifyAttributeEqual(profileEmailInit, profileEmailSecond)
            .verifyAttributeEqual(profilePhoneInit, profilePhoneSecond)
            .verifyAttributeEqual(profileAddressInit, profileAddressSecond)
            .verifyAttributeEqual(profileSupportPINInit, profileSupportPINSecond)
            .verifyAttributeEqual(profileNewsletterInit, profileNewsletterSecond);
    });

    it('Refreshing support pin and check that it updated', () => {
        const profileSupportPINInit = profilePage.gettingProfileFieldText(profileSupportPINField);
        at(profilePage).clickingTheButton(regeneratePinButton);
        browser.pause(2000);
        const profileSupportPINChanged = profilePage.gettingProfileFieldText(profileSupportPINField);
        at(profilePage).verifyAttributeNotEqual(profileSupportPINInit, profileSupportPINChanged);
    });
});
