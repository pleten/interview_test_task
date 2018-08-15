describe("My profile  Tests  -----> ", function () {

    let homePage = require('../../Pages/homePage.js');
    let profilePage = require('../../Pages/profilePage.js');
    let login = browser.params.testUserLogin;
    let password = browser.params.testUserPassword;
    let fields = profilePage.fields;
    let pinFieldName = profilePage.getSupportPinField().name;
    let pinBeforeRefresh;
    let _ = require('lodash');


    beforeEach(function () {
        homePage.get();
        homePage.logIn(login, password);
    });

    afterEach(function () {
        homePage.logOut();
    });

    it("Test Case - 6 Client Area", () => {
        homePage.navigateToUserProfilePage();
        //Get current values for each field
        _.forEach(fields, function (eachField) {
            profilePage.getFieldValue(eachField.name)
                .then((text) => {
                    expect(text.length).not.toEqual(0);
                    eachField.value = text;
                })
        });
        homePage.logOut();
        homePage.logIn(login, password);
        homePage.navigateToUserProfilePage();
        //Verify values for each field
        _.forEach(fields, function (eachField) {
            profilePage.getFieldValue(eachField.name)
                .then((text) => {
                    expect(text).toBe(eachField.value, "Wrong text for  field " + eachField.name)
                })
        });


    });

    it("Test Case - 7 Refresh support pin", () => {
        homePage.navigateToUserProfilePage();
        pinBeforeRefresh = profilePage.getFieldValue(pinFieldName);
        profilePage.refreshSupportPinButton.click();
        profilePage.getFieldValue(pinFieldName)
            .then(text => {
                expect(text).not.toBe(pinBeforeRefresh)
            })


    });


});