"use strict";

const profilePage = requirePO("profile/profile"),
    email = browser.params.users.regularUser.email,
    password = browser.params.users.regularUser.password;

let supportPin,
    updatedSupportPin;

describe("My profile page. Refresh support pin", function () {
    beforeAll(function () {
        browser.get("/");
        helpers.logIn(email, password);
    });

    afterAll(function () {
        helpers.logOut();
    });

    it("should show appropriate title, url when after opening the 'Profile' page", function () {
        helpers.openProfilePage();
        supportPin = profilePage.supportPinValue.getText();
        profilePage.updateSupportPinIcon.click();
        updatedSupportPin = profilePage.supportPinValue.getText();
        
        expect(supportPin).not.toEqual(updatedSupportPin);
    });
});
