"use strict";

const authPage = requirePO("authorization/authorization"),
    headerPage = requirePO("layout/header"),
    email = browser.params.users.regularUser.email,
    password = browser.params.users.regularUser.password;

describe("Log Out", function () {
    beforeAll(function () {
        browser.get("/");
        helpers.logIn(email, password);
    });

    it("should navigate to the 'Authorization' page and show the 'Sign In | SSLs.com' title after logout", function () {
        headerPage.userDropdownMenu.click();
        headerPage.logOutLink.click();
        authPage.wait();
        browser.wait(helpers.urlChanged(authPage.url), 15000, "There was no redirect to the 'Authorization' page.");
        expect(browser.getTitle()).toEqual("Sign In | SSLs.com");
    });

    it("should show the 'LOG IN' link on the rigth side of the page header when a user isn't authorized", function () {
        expect(headerPage.userCertificatesLink.isPresent()).toEqual(false);
        expect(headerPage.logInLink.isDisplayed()).toEqual(true);
        expect(headerPage.logInLink.isEnabled()).toEqual(true);
        expect(headerPage.logInLink.getText()).toEqual('LOG IN');
    });

    it("should show empty email and password fields after logout", function () {
        expect(authPage.emailInput.getText()).toBeEmptyString();
        expect(authPage.passwordInput.getText()).toBeEmptyString();
    });
});
