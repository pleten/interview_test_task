import {Page} from "../objects/pages";
import {NOTIFICATIONS, TEST_USERS, USER_OPTIONS} from "../assets";
import {browser} from "protractor";
import {authorization} from "../utils/authorization";

const homePage = new Page.Home();
const authorizationPage = new Page.Authorization();

describe("Authorization page", async () => {
    describe("For registered user", () => {
        beforeAll(async () => {
            await authorization.logout();
        });

        it("should open [home page]", async () => {
            await homePage.open();

            await expect(homePage).toBeOpened();
        });

        it("should open [authorization page] on clicking [login button]", async () => {
            await homePage.header.loginButton.click();

            await expect(authorizationPage).toBeOpened();
        });

        it("should show password on clicking [show password button]", async () => {
            await authorizationPage.loginForm.setUser(TEST_USERS.REGISTERED_USER);
            await authorizationPage.loginForm.passwordField.showPasswordButton.click();

            await expect(authorizationPage.loginForm.passwordField).toHaveValue(TEST_USERS.REGISTERED_USER.password);
        });

        it("should change [login button] to [user button] with [user dropdown] on authorization", async () => {
            await authorizationPage.loginForm.submitButton.click();

            await expect(authorizationPage.header.loginButton).not.toBePresent();
            await expect(authorizationPage.header.userButton).toBeDisplayed();
            await expect(authorizationPage.header.userDropdown).toBeDisplayed();
        });

    });

    describe("For not registered user", () => {
        beforeAll(async () => {
            await authorization.logout();
        });

        it("should open [home page]", async () => {
            await homePage.open();

            await expect(homePage).toBeOpened();
        });

        it("should open [authorization page] on clicking [login button]", async () => {
            await homePage.header.loginButton.click();

            await expect(authorizationPage).toBeOpened();
        });

        it("should show password on clicking [show password button]", async () => {
            await authorizationPage.loginForm.setUser(TEST_USERS.NOT_REGISTERED_USER);
            await authorizationPage.loginForm.passwordField.showPasswordButton.click();

            await expect(authorizationPage.loginForm.passwordField)
                .toHaveValue(TEST_USERS.NOT_REGISTERED_USER.password);
        });

        it("should show warning notification on trying to authorize not registered user", async () => {
            await authorizationPage.loginForm.submitButton.click();
            await browser.sleep(500);

            await expect(authorizationPage.notificationBar).toBeDisplayed();
            await expect(authorizationPage.notificationBar).toHaveText(NOTIFICATIONS.USER_NOT_REGISTERED);
        });
    });

    describe("For invalid email", () => {
        const invalidEmail = "i.m.so@@invalid";

        beforeAll(async () => {
            await authorization.logout();
        });

        it("should open [home page]", async () => {
            await homePage.open();

            await expect(homePage).toBeOpened();
        });

        it("should open [authorization page] on clicking [login button]", async () => {
            await homePage.header.loginButton.click();

            await expect(authorizationPage).toBeOpened();
        });

        it("should show warning on entering invalid email", async () => {
            await authorizationPage.loginForm.email.setValue(invalidEmail);

            await expect(authorizationPage.loginForm.email.tooltip).toBeDisplayed();
            await expect(authorizationPage.loginForm.email.tooltip).toHaveText(NOTIFICATIONS.EMAIL_INVALID);
        });
    });

    describe("For empty fields", () => {
        beforeAll(async () => {
            await authorization.logout();
        });

        it("should open [home page]", async () => {
            await homePage.open();

            await expect(homePage).toBeOpened();
        });

        it("should open [authorization page] on clicking [login button]", async () => {
            await homePage.header.loginButton.click();

            await expect(authorizationPage).toBeOpened();
        });

        it("should show warnings on trying to authorize with empty fields", async () => {
            await authorizationPage.loginForm.submitButton.click();

            await expect(authorizationPage.loginForm.email.tooltip).toBeDisplayed();
            await expect(authorizationPage.loginForm.email.tooltip).toHaveText(NOTIFICATIONS.EMAIL_EMPTY);
            await expect(authorizationPage.loginForm.passwordField.tooltip).toBeDisplayed();
            await expect(authorizationPage.loginForm.passwordField.tooltip).toHaveText(NOTIFICATIONS.PASSWORD_EMPTY);
        });
    });

    describe("Log out", () => {
        beforeAll(async () => {
            await authorization.login();
            await homePage.open();
        });

        it("should log out and redirect to [authorization page] on clicking [log out] option", async () => {
            await homePage.header.userDropdown.getOption(USER_OPTIONS.LOGOUT).select();

            await expect(authorizationPage).toBeOpened();
            await expect(authorizationPage.header.userButton).not.toBePresent();
            await expect(authorizationPage.header.loginButton).toBeDisplayed();
        });
    });

});
