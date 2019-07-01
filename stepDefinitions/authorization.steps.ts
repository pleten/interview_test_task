const { Given, When, Then } = require("cucumber");
const expect = require("chai").use(require("chai-as-promised")).expect;
import { onAuthorizationPage, onDropDownMenu } from "../pagesObjects";
import { browser } from "protractor";

Given(/^I am on Login page$/, async function () {
    await onAuthorizationPage.goToAuthorizationPage();
    expect(await onAuthorizationPage.isAuthorizationPageOpened()).to.be.true;
});

Given(/^I login as registered user$/, async function () {
    await onAuthorizationPage.goToAuthorizationPage();
    expect(await onAuthorizationPage.isAuthorizationPageOpened(), "Authorization page is not opened").to.be.true;
    await onAuthorizationPage.fillInLoginInput(browser.params.login.user);
    await onAuthorizationPage.fillInPasswordInput(browser.params.login.password);
    await onAuthorizationPage.initLogin();
});

When(/^I fill in valid credentials$/, async function () {
    await onAuthorizationPage.fillInLoginInput(browser.params.login.user);
    await onAuthorizationPage.fillInPasswordInput(browser.params.login.password);
});

When(/^I fill in (.*?) and (.*?) fields$/, async function (email, password) {
    await onAuthorizationPage.fillInLoginInput(email);
    await onAuthorizationPage.fillInPasswordInput(password);
});

When(/^I fill in (.*?) into Password field$/, async function (password) {
    await onAuthorizationPage.fillInPasswordInput(password);
});

When(/^I fill in (.*?) into Email field$/, async function (email) {
    await onAuthorizationPage.fillInLoginInput(email);
});

When(/^I initiate login$/, async function () {
    await onAuthorizationPage.initLogin();
});

When(/^I press Eye icon$/, async function () {
    await onAuthorizationPage.clickEyeButton();
});

Then(/^I should be logged in to the system$/, async function () {
    expect(await onDropDownMenu.isUserCertificatesListButtonDisplayed()).to.be.true;
    expect(await onDropDownMenu.getUserCertificatesListButtonTitle()).to.be.equal(browser.params.login.user);
});

Then(/^Filled (.*?) password should be displayed in the field$/, async function (password) {
    expect(await onAuthorizationPage.isPasswordDisplayedInTheField()).to.be.true;
    const passwordFromTheField = await onAuthorizationPage.getPasswordValueFromTheField();
    expect(passwordFromTheField).to.be.equal(password);
});

Then(/^(.*?) validation message for Email filed should be displayed$/, async function (message) {
    expect(await onAuthorizationPage.isValidationMessageDisplayedForEmailField()).to.be.true;
    const actualMessage = await onAuthorizationPage.getValidationMessageForEmailField();
    expect(actualMessage).to.be.equal(message);
});

Then(/^(.*?) validation message for Password field should be displayed$/, async function (message) {
    expect(await onAuthorizationPage.isValidationMessageDisplayedForPasswordField()).to.be.true;
    const actualMessage = await onAuthorizationPage.getValidationMessageForPasswordField();
    expect(actualMessage).to.be.equal(message);
});

Then(/^(.*?) notification message should be displayed$/, async function (message) {
    expect(await onAuthorizationPage.isNotificationMessageDisplayed()).to.be.true;
    const actualMessage = await onAuthorizationPage.getNotificationMessageText();
    expect(actualMessage).to.be.equal(message);
});