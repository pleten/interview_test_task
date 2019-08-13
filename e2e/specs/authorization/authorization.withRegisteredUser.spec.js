"use strict";

const authPage = requirePO("authorization/authorization"),
    headerPage = requirePO("layout/header"),
    homePage = requirePO("home/home"),
    email = browser.params.users.regularUser.email,
    password = browser.params.users.regularUser.password,
    username = browser.params.users.regularUser.username,
    baseUrl = browser.params.baseUrl;

describe("Authorization page (Welcome back!)", function () {
    beforeAll(function () {
        browser.get("/");
    });

    afterAll(function () {
        helpers.logOut();
    });

    it("should show the title with SSL Certs and save-up info when an unathorized user is on the 'Home' page", function () {
        browser.wait(EC.visibilityOf(homePage.promoBanner), 30000, 'Banner does not become visibile');
        expect(browser.getTitle()).toContain("SSL Certificates—Buy Cheap SSL Certs from ");
        expect(browser.getTitle()).toContain("& Save up to");
    });

    it("should show promoBanner when an unathorized user is on the 'Home' page", function () {
        expect(homePage.promoBanner.isDisplayed()).toEqual(true);
    });

    it("should show enabled 'LOG IN' link when an unathorized user is on the 'Home' page", function () {
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

    it("should not show a password with the turned off 'eye' mode by the default on the 'Authorization' page", function () {
        authPage.emailInput.sendKeys(email);
        authPage.passwordInput.sendKeys(password);

        expect(authPage.passwordInput.getAttribute("type")).toEqual("password");
    });

    it("should show the not crossed eye icon with the turned off 'eye' mode by the default on the 'Authorization' page", function () {
        expect(authPage.onEyeIcon.isDisplayed()).toEqual(true);
        expect(authPage.offEyeIcon.isDisplayed()).toEqual(false);
    });
    
    it("should show a password with the turned on 'eye' mode on the 'Authorization' page after click the 'Eye' icon ", function () {
        authPage.onEyeIcon.click();

        expect(authPage.passwordInput.getAttribute("type")).toEqual("text");
    });

    it("should show the crossed eye icon with the turned on 'eye' mode on the 'Authorization' page after click the 'Eye' icon ", function () {
        expect(authPage.onEyeIcon.isDisplayed()).toEqual(false);
        expect(authPage.offEyeIcon.isDisplayed()).toEqual(true);
    });

    it("should show the enabled 'LOGIN' button on the 'Authorization' page", function () {
        expect(authPage.loginButton.isDisplayed()).toEqual(true);
        expect(authPage.loginButton.isEnabled()).toEqual(true);
    });

    it("should navigate to the Home page after clicking the 'LOGIN' button", function () {
        authPage.loginButton.click();
        browser.wait(EC.visibilityOf(homePage.promoBanner), 30000, "Promo banner is not visible.");
    });

    it("should show the 'User@email' button on the rigth side of the page header when a user is authorized", function () {
        expect(headerPage.userCertificatesLink.isDisplayed()).toEqual(true);
        expect(headerPage.userCertificatesLink.isEnabled()).toEqual(true);
        expect(headerPage.userCertificatesLink.getAttribute('href')).toEqual(baseUrl + '/user/certificates');
        expect(headerPage.userCertificatesLink.getText()).toEqual(email);
    });

    it("should show dropdown menu icon on the rigth side of the page header when a user is authorized", function () {
        expect(headerPage.userDropdownMenu.isDisplayed()).toEqual(true);
        expect(headerPage.userDropdownMenu.isEnabled()).toEqual(true);
    });

    it("should show dropdown menu items when an authorized user clicks on the dropdown menu icon", function () {
        headerPage.userDropdownMenu.click();

        expect(headerPage.purchasedCertsLink.isDisplayed()).toEqual(true);
        expect(headerPage.purchasedCertsLink.isEnabled()).toEqual(true);
        expect(headerPage.purchasedCertsLink.getAttribute('href')).toEqual(baseUrl + '/user/certificates');

        expect(headerPage.orderHistoryLink.isDisplayed()).toEqual(true);
        expect(headerPage.orderHistoryLink.isEnabled()).toEqual(true);
        expect(headerPage.orderHistoryLink.getAttribute('href')).toEqual(baseUrl + '/user/orders');

        expect(headerPage.addFundsLink.isDisplayed()).toEqual(true);
        expect(headerPage.addFundsLink.isEnabled()).toEqual(true);
        expect(headerPage.addFundsLink.getAttribute('href')).toEqual(baseUrl + '/user/add_funds/stripe_cc');

        expect(headerPage.viewProfileLink.isDisplayed()).toEqual(true);
        expect(headerPage.viewProfileLink.isEnabled()).toEqual(true);
        expect(headerPage.viewProfileLink.getAttribute('href')).toEqual(baseUrl + '/user/profile');

        expect(headerPage.logOutLink.isDisplayed()).toEqual(true);
        expect(headerPage.logOutLink.isEnabled()).toEqual(true);

        expect(headerPage.userDataInDropdown.getText()).toContain(username + " " + email + "\nSupport pin: ");
    });
});
