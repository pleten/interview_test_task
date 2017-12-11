let data = require('../resources/TestData.json');
let pHome = require('../pages/Home.js');
let pAuth = require('../pages/Auth.js');
let pProfile = require('../pages/Profile.js');
let assert = require('assert');

Feature('Profile');

Scenario('Test profile page: "6. Client area"', (I) => {
    pAuth.authorizeSuccess(data.credentials.email, data.credentials.password);
    pHome.clickPersonalMenuOpt(pHome.locators.fldLogin.drdPersonalMenu.optViewProfile);
    I.seeMany(pProfile.locators.profileFields);
});

Scenario('Test profile page: "7. Refresh support pin"', function*(I) {
    pAuth.authorizeSuccess(data.credentials.email, data.credentials.password);
    pHome.clickPersonalMenuOpt(pHome.locators.fldLogin.drdPersonalMenu.optViewProfile);

    let supportPinValueLocator = pProfile.getValueContextByFieldName(pProfile.locators.profileFields.supportPin);
    I.waitForElement(supportPinValueLocator, 2);
    let savedSupportPin = yield I.grabTextFrom(supportPinValueLocator);

    pProfile.clickButtonNextToFieldName(pProfile.locators.profileFields.supportPin);
    I.wait(1);
    let updatedSupportPin = yield I.grabTextFrom(supportPinValueLocator);

    assert.notEqual(savedSupportPin, updatedSupportPin);
});
