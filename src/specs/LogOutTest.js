import { openingHomePage } from '../functions/BaseFunctions';
import { at } from '../utils/PageFactory';
import basePage from '../pages/BasePage';
import { logInButton } from '../pages/HomePage';
import authPage, {
    authLoginButton,
    emailField,
    logOutButton,
    passwordFieldPassword,
    profileDropdownButton, viewProfileLink
} from '../pages/AuthorizePage';
import { emailToLogin, passwordToLogin } from '../model/Credentials';
import { siteAuthorizeUrl } from '../model/Constants';

describe('"Log Out tests',() => {
    before('Logging in', () => {
        openingHomePage();
        at(basePage).clickingTheButton(logInButton)
            .inputToField(emailField, emailToLogin)
            .inputToField(passwordFieldPassword, passwordToLogin)
            .clickingTheButton(authLoginButton)
            .clickingTheButton(profileDropdownButton)
            .clickingTheButton(viewProfileLink);
    });

    after('Cleaning browser session', () => {
        at(basePage).cleanBrowserSession();
    });

    it('Testing "Log Out" functionality', () => {
        at(authPage).clickingTheButton(profileDropdownButton)
            .clickingTheButton(logOutButton)

        //Checking that logged out
            .elementIsNotExisting(profileDropdownButton)
            .elementIsDisplaying(logInButton);

        //Checking that url is "https://www.ssls.com/authorize"
        const currentUrl = browser.getUrl();
        at(authPage).verifyAttributeEqual(currentUrl, siteAuthorizeUrl);

    });
});
