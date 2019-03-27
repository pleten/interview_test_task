import { openingHomePage } from '../functions/BaseFunctions';
import { at } from '../utils/PageFactory';
import basePage from '../pages/BasePage';
import homePage, { logInButton } from '../pages/HomePage';
import authPage, {
    authLoginButton,
    authPageHeader,
    emailField,
    emptyEmailFieldMessage,
    emptyPasswordFieldMessage,
    incorrectCredsMessage,
    passwordEyeButton,
    passwordFieldPassword,
    passwordFieldText,
    profileDropdownButton
} from '../pages/AuthorizePage';
import { emailToLogin, passwordToLogin } from '../model/Credentials';
import { randomEmail, randomPassword6Figures, siteUrl } from '../model/Constants';

describe('"Authorization tests',() => {
    beforeEach('Opening Home page and clicking on "LOG IN" text', () => {
        openingHomePage();

        //Checking that Home page is opened
        const currentUrl = browser.getUrl();
        at(homePage).verifyAttributeEqual(currentUrl, siteUrl);

        at(homePage).clickingTheButton(logInButton);

        //Checking that auth page is opened after pressing 'Logging in' button
        at(authPage).elementIsExisting(authPageHeader);
    });

    afterEach('Cleaning browser session', () => {
        at(basePage).cleanBrowserSession();
    });

    it('Authorization page (Welcome back!)', () => {
        at(authPage).inputToField(emailField, emailToLogin)
            .inputToField(passwordFieldPassword, passwordToLogin)
            .clickingTheButton(passwordEyeButton)

        //Checking that after pressing on "Eye" button input of password field become visible
            .elementIsNotExisting(passwordFieldPassword)
            .elementIsDisplaying(passwordFieldText)

            .clickingTheButton(authLoginButton)

        //Checking that after pressing "auth Login Button", "Log in" button has changed on "User@email" button (with dropdown menu)
            .elementIsNotExisting(logInButton)
            .elementIsDisplaying(profileDropdownButton);
    });

    it('Authorization page. Not registered user', () => {
        at(authPage).inputToField(emailField, randomEmail)
            .inputToField(passwordFieldPassword, randomPassword6Figures)
            .clickingTheButton(passwordEyeButton)

        //Checking that after pressing on "Eye" button input of password field become visible
            .elementIsNotExisting(passwordFieldPassword)
            .elementIsDisplaying(passwordFieldText)

            .clickingTheButton(authLoginButton)

        //Checking of displaying message "Uh oh! Email or password is incorrect" after providing invalid credentials
            .verifySystemMessage(incorrectCredsMessage);
    });

    it('Authorization page. Invalid email', () => {
        at(authPage).inputToField(emailField, randomEmail)
            .inputToField(passwordFieldPassword, passwordToLogin)
            .clickingTheButton(passwordEyeButton)

        //Checking that after pressing on "Eye" button input of password field become visible
            .elementIsNotExisting(passwordFieldPassword)
            .elementIsDisplaying(passwordFieldText)

            .clickingTheButton(authLoginButton)

        //Checking of displaying message "Uh oh! Email or password is incorrect" after providing invalid credentials
            .verifySystemMessage(incorrectCredsMessage);
    });

    it('Authorization page. Empty fields', () => {
        at(authPage).inputToField(emailField, '')
            .inputToField(passwordFieldPassword, '')
            .clickingTheButton(authLoginButton)

        //Checking the displaying of tooltips for empty fields
            .elementIsDisplaying(emptyEmailFieldMessage)
            .elementIsDisplaying(emptyPasswordFieldMessage);
    });
});
