"use strict";

const profilePage = requirePO("profile/profile"),
    email = browser.params.users.regularUser.email,
    password = browser.params.users.regularUser.password;

let preconditionValues;

describe("My profile page. Client area", function () {
    beforeAll(function () {
        browser.get("/");
        helpers.logIn(email, password);
        helpers.openProfilePage();
        preconditionValues = profilePage.profileValues.map(function (elm) {
            return elm.getText();
        });
        helpers.logOut();
    });

    afterAll(function () {
        helpers.logOut();
    });

    it("should show appropriate title, url when after opening the 'Profile' page", function () {
        helpers.logIn(email, password);
        helpers.openProfilePage();

        browser.wait(EC.visibilityOf(profilePage.pageTitle), 30000, "Page title is not visible.");
        browser.wait(helpers.urlChanged(profilePage.url), 15000, "There was no redirect to the 'Profile' page.");
        expect(browser.getTitle()).toEqual("My Profile | SSLs.com");
        expect(profilePage.profileForm.isDisplayed()).toEqual(true);
    });

    it("should show the same values on the page as in the preconditions", function () {
        const currentValues = profilePage.profileValues.map(function (elm) {
            return elm.getText();
        });
        // clould be flaky, if someone runs a test like this in parallel
        expect(preconditionValues).toEqual(currentValues);
    });
});
