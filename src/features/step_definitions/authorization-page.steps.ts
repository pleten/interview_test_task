import {Given, Then, When} from "cucumber";
import {AuthorizationPage} from "../../domain/services/page-objects/authorization-page";
import {PAGE_OBJECT_TYPES} from "../../domain/services/page-objects/page-object-types";
import {expect} from "./common-imports";

Given(/^the Authorization page has been opened$/, async function () {
    try {
        const authorizationPage: AuthorizationPage = this.platformPageMap.get(PAGE_OBJECT_TYPES.AuthorizationPage);
        const opened: boolean = await authorizationPage.isOpened();
        if (!opened) {
            await authorizationPage.open();
        }
    } catch (e) {
        throw new Error(e);
    }
});

When(/^the user logs in to the user's account$/, async function () {
    try {
        const authorizationPage: AuthorizationPage = this.platformPageMap.get(PAGE_OBJECT_TYPES.AuthorizationPage);
        await authorizationPage.open();
        await authorizationPage.isOpened();
        await authorizationPage.logIn();
    } catch (e) {
        throw new Error(e);
    }
});

When(/^the user enters e-mail ([^"]*)$/, async function (email: string) {
    try {
        const authorizationPage: AuthorizationPage = this.platformPageMap.get(PAGE_OBJECT_TYPES.AuthorizationPage);
        await authorizationPage.inputEmail(email);
    } catch (e) {
        throw new Error(e);
    }
});

When(/^the user enters password ([^"]*)$/, async function (password: string) {
    try {
        const authorizationPage: AuthorizationPage = this.platformPageMap.get(PAGE_OBJECT_TYPES.AuthorizationPage);
        await authorizationPage.inputPassword(password);
    } catch (e) {
        throw new Error(e);
    }
});

When(/^the user enters email ([^"]*) and password ([^"]*)$/,
    async function (email: string, password: string) {
        try {
            const authorizationPage: AuthorizationPage = this.platformPageMap
                .get(PAGE_OBJECT_TYPES.AuthorizationPage);
            await authorizationPage.inputEmail(email);
            await authorizationPage.inputPassword(password);
        } catch (e) {
            throw new Error(e);
        }
    });

When(/^the user clicks "Login" button$/, async function () {
    try {
        const authorizationPage: AuthorizationPage = this.platformPageMap
            .get(PAGE_OBJECT_TYPES.AuthorizationPage);
        await authorizationPage.clickLoginButton();
    } catch (e) {
        throw new Error(e);
    }
});

When(/^the user clicks on "eye" icon for password field$/, async function () {
    try {
        const authorizationPage: AuthorizationPage = this.platformPageMap.get(PAGE_OBJECT_TYPES.AuthorizationPage);
        await authorizationPage.clickPasswordEye();
    } catch (e) {
        throw new Error(e);
    }
});

Then(/^the Authorization page is opened$/, async function () {
    try {
        const authorizationPage: AuthorizationPage = this.platformPageMap.get(PAGE_OBJECT_TYPES.AuthorizationPage);
        const opened: boolean = await authorizationPage.isOpened();

        expect(opened).to.equal(true, 'The authorization page is not opened.');
    } catch (e) {
        throw new Error(e);
    }
});

Then(/^the password string ([^"]*) appears in the password field$/, async function (password: string) {
    try {
        const authorizationPage: AuthorizationPage = this.platformPageMap.get(PAGE_OBJECT_TYPES.AuthorizationPage);
        const actualPassword: string = await authorizationPage.getPasswordValue();

        expect(actualPassword).to.equal(password, 'The passwords differ.');
    } catch (e) {
        throw new Error(e);
    }
});

Then(/^the error message with text appears$/, async function (text: string) {
    try {
        const authorizationPage: AuthorizationPage = this.platformPageMap.get(PAGE_OBJECT_TYPES.AuthorizationPage);
        const actualText: string = await authorizationPage.getErrorMessageText();

        expect(actualText).to.equal(text, 'The message texts differ.');
    } catch (e) {
        throw new Error(e);
    }
});

Then(/^the error message for empty email field appears with text$/, async function (text: string) {
    try {
        const authorizationPage: AuthorizationPage = this.platformPageMap.get(PAGE_OBJECT_TYPES.AuthorizationPage);
        const actualText: string = await authorizationPage.getEmailFieldErrorMessage('EMPTY');

        expect(actualText).to.equal(text, 'The message texts differ.');
    } catch (e) {
        throw new Error(e);
    }
});

Then(/^the error message for email field appears with text about wrong format$/,
    async function (text: string) {
        try {
            const authorizationPage: AuthorizationPage = this.platformPageMap
                .get(PAGE_OBJECT_TYPES.AuthorizationPage);
            const actualText: string = await authorizationPage.getEmailFieldErrorMessage('NOT_EMAIL');

            expect(actualText).to.equal(text, 'The message texts differ.');
        } catch (e) {
            throw new Error(e);
        }
    });

Then(/^the error message for password field appears with text$/, async function (text: string) {
    try {
        const authorizationPage: AuthorizationPage = this.platformPageMap.get(PAGE_OBJECT_TYPES.AuthorizationPage);
        const actualText: string = await authorizationPage.getPasswordFieldErrorMessage();

        expect(actualText).to.equal(text, 'The message texts differ.');
    } catch (e) {
        throw new Error(e);
    }
});

Then(/^the user is logged out$/, async function () {
    try {
        const authorizationPage: AuthorizationPage = this.platformPageMap.get(PAGE_OBJECT_TYPES.AuthorizationPage);
        const loggedOut: boolean = await authorizationPage.isLoggedOut();

        expect(loggedOut).to.equal(true, 'The user is not logged out.');
    } catch (e) {
        throw new Error(e);
    }
});

Then(/^the user is redirected on authorization page ([^"]*)$/, async function (url: string) {
    try {
        const actualUrl: string = await AuthorizationPage.getCurrentUrl();

        expect(actualUrl).to.equal(url, 'The URL-s differ.');
    } catch (e) {
        throw new Error(e);
    }
});