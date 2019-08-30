const chai = require('chai');
const faker = require('faker');
const expect = chai.expect;

Feature('Authorization for guest users');
Before((I, authorizePage) => {
    I.amOnPage(authorizePage.url);
    I.waitForElement(authorizePage.authForm);
});

Scenario('eye icon shows entered password', async (I, authorizePage, User) => {
    I.fillField(authorizePage.fields.password, User.password);
    I.seeAttributesOnElements(authorizePage.fields.password, {type: "password"});
    I.click(authorizePage.showPassword);
    I.seeAttributesOnElements(authorizePage.fields.password, {type: "text"});
    let currentPassword = await I.grabValueFrom(authorizePage.fields.password);
    expect(currentPassword).to.be.equal(User.password)
});

Scenario('user submits empty form', (I, authorizePage,) => {
    I.click(authorizePage.loginBtn);
    I.see(authorizePage.texts.emptyEmail, authorizePage.emailFieldTooltip);
    I.see(authorizePage.texts.emptyPassword, authorizePage.passwordFieldTooltip);
});

Scenario('Not registered user can not authorize', (I, authorizePage, notificationCenterElem) => {
    authorizePage.login('not_real_' + faker.internet.email(), faker.internet.password());
    I.waitForElement(notificationCenterElem.rootId);
    within(notificationCenterElem.rootId, () => {
        I.see(notificationCenterElem.text.wrongEmailOrPassword);
    });
});

Scenario('User with invalid email can see the error message', (I, authorizePage) => {
    authorizePage.login('not_valid@@', faker.internet.password());
    I.see(authorizePage.texts.invalidEmail, authorizePage.emailFieldTooltip);
});
