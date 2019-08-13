"use strict";

const authPage = requirePO("authorization/authorization"),
    headerPage = requirePO("layout/header"),
    homePage = requirePO("home/home");

describe("Authorization page. Empty fields", function () {
    beforeAll(function () {
        browser.get("/");
    });

    it("should show appropriate title when a user is unathorized and after opening " + browser.params.baseUrl + " url", function () {
        browser.wait(EC.visibilityOf(homePage.promoBanner), 30000, 'Banner does not become visibile');
        expect(browser.getTitle()).toContain("SSL Certificates—Buy Cheap SSL Certs from ");
        expect(browser.getTitle()).toContain("& Save up to");
    });

    it("should show promoBanner when a user is unathorized and after opening " + browser.params.baseUrl + " url", function () {
        expect(homePage.promoBanner.isDisplayed()).toEqual(true);
    });

    it("should show enabled 'LOG IN' link when a user is unathorized and after opening " + browser.params.baseUrl + " url", function () {
        expect(headerPage.logInLink.isDisplayed()).toEqual(true);
        expect(headerPage.logInLink.isEnabled()).toEqual(true);
        expect(headerPage.logInLink.getText()).toEqual("LOG IN");
    });

    it("should navigate to the 'Authorization' page after click on the 'LOG IN' link", function () {
        headerPage.logInLink.click();
        authPage.wait();
        browser.wait(helpers.urlChanged(authPage.url), 15000, "There was no redirect to the 'Authorization' page.");
        expect(browser.getTitle()).toEqual("Sign In | SSLs.com");
    });

    it("should show the 'Welcome back!' form on the 'Authorization' page", function () {
        expect(authPage.emailInput.isDisplayed()).toEqual(true);
        expect(authPage.emailInput.isEnabled()).toEqual(true);
        // check email placeholder
        expect(authPage.emailInput.getAttribute("placeholder")).toEqual("Email");

        expect(authPage.passwordInput.isDisplayed()).toEqual(true);
        expect(authPage.passwordInput.isEnabled()).toEqual(true);
        // check password placeholder
        expect(authPage.passwordInput.getAttribute("placeholder")).toEqual("Enter password");

        // check 'I fogot' link
        expect(authPage.forgotPasswordLink.isDisplayed()).toEqual(true);
        expect(authPage.forgotPasswordLink.isEnabled()).toEqual(true);
        expect(authPage.forgotPasswordLink).toHaveColor(authPage.forgotPasswordLinkColor);
    });

    it("should show the enabled 'LOGIN' button on the 'Authorization' page", function () {
        expect(authPage.loginButton.isDisplayed()).toEqual(true);
        expect(authPage.loginButton.isEnabled()).toEqual(true);
    });

    it("should show the 'Oops, please enter your email' error message next to the 'Email' field after trying to login without email and password on the 'Authorization' page", function () {
        authPage.loginButton.click();
        browser.wait(EC.visibilityOf(authPage.authFieldsTooltips(authPage.email, true)), 30000, "Error is not visible.");        
        expect(authPage.authFieldsTooltips(authPage.email, true).isDisplayed()).toEqual(true);
        expect(authPage.authFieldsTooltips(authPage.email, true).getText()).toEqual("Oops, please\nenter your email");
    });

    it("should show the 'Looks like you’ve missed this one' error message next to the 'Password' field after trying to login without email and password on the 'Authorization' page", function () {  
        expect(authPage.authFieldsTooltips(authPage.password, true).isDisplayed()).toEqual(true);
        expect(authPage.authFieldsTooltips(authPage.password, true).getText()).toEqual("Looks like you’ve\nmissed this one");
    });
});
