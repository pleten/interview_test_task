/// <reference path="./steps.d.ts" />
var filePath;
const fs = require('fs');

Feature('User profile contains valid info');

Before(async (I, userProfilePage) => {
    I.login();
    filePath = await userProfilePage.saveUserProfileDataToFile();
    I.logOut();
});

Scenario('User profile data is the same', (I, loginAs, userProfilePage) => {
    loginAs('user');

    let rawData = fs.readFileSync(filePath);
    let userData = JSON.parse(rawData);
    let radioButtonValue = userData.newsletter;
    delete userData.newsletter;

    I.amOnPage(userProfilePage.url);
    I.waitForElement(userProfilePage.profileContentBlck);
    for (let key in userData) {
        I.see(userData[key], userProfilePage.getFormDescriptionLocatorByName(key));
    }
    I.seeNumberOfVisibleElements(userProfilePage.newsletterRadioBtn, radioButtonValue)
});


Scenario('View profile link leads to profile page', (I, loginAs, userProfilePage, headerElem) => {
    loginAs('user');
    I.click(headerElem.dropdownMenuBtn);
    I.waitForElement(headerElem.dropdownMenuItems.viewProfile);
    I.click(headerElem.dropdownMenuItems.viewProfile);
    I.seeInCurrentUrl(userProfilePage.url);
    I.waitForElement(userProfilePage.profileContentBlck, 4);
});
