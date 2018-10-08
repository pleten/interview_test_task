const mainPage = require("../../pages/mainPage.js");
const profilePage = require("../../pages/profilePage.js");

let userLogin = "ssls.automation+5@gmail.com";
let userPasswd = "123456";

let currentName, currentEmail, currentPhone, currentAddress, currentSupportPin, currentNewsletterToggle;


describe('​My profile page. Client area', function () {

    beforeAll(function () {
        mainPage.authUser(userLogin, userPasswd);
        mainPage.goToUserProfile();
        currentName = profilePage.getProfileField("Name").getText().then((text) => currentName = text);
        currentEmail = profilePage.getProfileField("Email").getText().then((text) => currentEmail = text);
        currentPhone = profilePage.getProfileField("Phone").getText().then((text) => currentPhone = text);
        currentAddress = profilePage.getProfileField("Address").getText().then((text) => currentAddress = text);
        currentSupportPin = profilePage.getProfileField("Support pin").getText().then((text) => currentSupportPin = text);
        currentNewsletterToggle = profilePage.newsletterToggleBtn.getAttribute("class")
            .then((classValue) => currentNewsletterToggle = classValue);
        mainPage.logOut();
    });

    afterAll(function () {
        mainPage.logOut();
    });

    it('Check save values ', function () {
        mainPage.authUser(userLogin, userPasswd);
        mainPage.goToUserProfile();

        expect(browser.getCurrentUrl()).toEqual('https://www.ssls.com/user/profile');
        expect(profilePage.getProfileField('Name').getText()).toEqual(currentName);
        expect(profilePage.getProfileField('Email').getText()).toEqual(currentEmail);
        expect(profilePage.getProfileField('Password').getText()).not.toBe(null);
        expect(profilePage.getProfileField('Phone').getText()).toEqual(currentPhone);
        expect(profilePage.getProfileField('Address').getText()).toEqual(currentAddress);
        expect(profilePage.getProfileField('Support pin').getText()).toEqual(currentSupportPin);
        expect(profilePage.newsletterToggleBtn.getAttribute('class')).toEqual(currentNewsletterToggle);
    });
});