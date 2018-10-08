const mainPage = require("../../pages/mainPage.js");
const profilePage = require("../../pages/profilePage.js");

let userLogin = "ssls.automation+5@gmail.com";
let userPasswd = "123456";

describe('​My profile page. Refresh support pin', function () {

    let currentPin;

    beforeAll(function () {
        mainPage.authUser(userLogin, userPasswd);
    });

    afterAll(function () {
        mainPage.logOut();
    });

    it('After click on “Update” button, support pin should be updated.', function () {
        mainPage.goToUserProfile();
        profilePage.getProfileField("Support pin").getText().then((text) => currentPin = text);
        profilePage.clickRegeneratePinBtn();

        expect(profilePage.getProfileField("Support pin").getText()).not.toEqual(currentPin);
    });
});