let pHome = require('../pages/Home.js');
let pAuth = require('../pages/Auth.js');
let data = require('../resources/TestData.json');
let faker = require('faker');

Feature('Authorization page');

Scenario('Test authorization success: "1. (Welcome back!)"', (I) => {
    I.amOnPage(pHome.url);
    I.click(pHome.locators.fldLogin.self);
    pAuth.authorize(data.credentials.email, data.credentials.password);
    I.waitForText(data.credentials.email, 2, pHome.locators.fldLogin.self);
});

Scenario('Test authorization failed for not registered user: "2. Not registered user"', (I) => {
    let fakeEmail = faker.internet.email();
    let fakePassword = faker.internet.password();

    I.amOnPage(pHome.url);
    I.click(pHome.locators.fldLogin.self);
    pAuth.authorize(fakeEmail, fakePassword);
    I.waitForText(pAuth.alerts.incorrectCredentials, 2);
});

Scenario('Test authorization failed for invalid email: "3. Invalid email"', (I) => {
    let invalidEmail = faker.internet.password();
    let fakePassword = faker.internet.password();

    I.amOnPage(pHome.url);
    I.click(pHome.locators.fldLogin.self);
    pAuth.authorize(invalidEmail, fakePassword);
    I.waitForText(pAuth.alerts.invalidCredentials.self, 2);
    I.waitForText(pAuth.alerts.invalidCredentials.email);
});

Scenario('Test authorization failed for not filled email and password: "4. Empty fields"', (I) => {
    I.amOnPage(pHome.url);
    I.click(pHome.locators.fldLogin.self);
    I.waitForElement(pAuth.locators.btnSubmit, 2);
    I.click(pAuth.locators.btnSubmit);
    I.waitForText(pAuth.alerts.emptyEmail.self, 2);
    I.waitForText(pAuth.alerts.emptyEmail.email);
    I.waitForText(pAuth.alerts.emptyPassword.self);
    I.waitForText(pAuth.alerts.emptyPassword.password);
});

Scenario('Test log out success: "5. Log Out"', (I) => {
    pAuth.authorizeSuccess(data.credentials.email, data.credentials.password);
    pHome.clickPersonalMenuOpt(pHome.locators.fldLogin.drdPersonalMenu.optLogOut);
    I.waitForElement(pHome.locators.fldLogin.btnLogin, 2);
});
