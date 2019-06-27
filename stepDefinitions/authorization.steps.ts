const { Given, When, Then } = require("cucumber");
const expect = require("chai").use(require("chai-as-promised")).expect;
import { onLoginPage, onDropDownMenu } from "../pagesObjects";
import { browser } from "protractor";

Given(/^I am on Login page$/, async () => {
    await onLoginPage.goToAuthorizationPage();
    expect(await onLoginPage.isAuthorizationPageOpened()).to.be.true;
});

Given(/^I login as registered user$/, async () => {
    await onLoginPage.goToAuthorizationPage();
    expect(await onLoginPage.isAuthorizationPageOpened()).to.be.true;
    await onLoginPage.fillInLoginInput(browser.params.login.user);
    await onLoginPage.fillInPasswordInput(browser.params.login.password);
    await onLoginPage.initLogin();
});

When(/^I fill in valid credentials$/, async () => {
    await onLoginPage.fillInLoginInput(browser.params.login.user);
    await onLoginPage.fillInPasswordInput(browser.params.login.password);
});

When(/^I fill in (.*?) and (.*?) fields$/, async (email, password) => {
    await onLoginPage.fillInLoginInput(email);
    await onLoginPage.fillInPasswordInput(password);
});

When(/^I fill in (.*?) into Password field$/, async (password) => {
    await onLoginPage.fillInPasswordInput(password);
});

When(/^I initiate login$/, async () => {
    await onLoginPage.initLogin();
});

When(/^I press Eye icon$/, async () => {
    await onLoginPage.clickEyeButton();
});

Then(/^I should be logged in to the system$/, async () => {
    expect(await onDropDownMenu.isUserCertificatesListButtonDisplayed()).to.be.true;
    expect(await onDropDownMenu.getUserCertificatesListButtonTitle()).to.be.equal(browser.params.login.user);
});

Then(/^Filled (.*?) password should be displayed in the field$/, async (password) => {
    expect(await onLoginPage.isPasswordDisplayedInTheField()).to.be.true;
    const passwordFromTheField = await onLoginPage.getPasswordValueFromTheField();
    expect(passwordFromTheField).to.be.equal(password);
});

Then(/^(.*?) validation message for Email filed should be displayed$/, async (message) => {
    expect(await onLoginPage.isValidationMessageDisplayedForEmailField()).to.be.true;
    const actualMessage = await onLoginPage.getValidationMessageForEmailField();
    expect(actualMessage).to.be.equal(message);
});

Then(/^(.*?) validation message for Password field should be displayed$/, async (message) => {
    expect(await onLoginPage.isValidationMessageDisplayedForPasswordField()).to.be.true;
    const actualMessage = await onLoginPage.getValidationMessageForPasswordField();
    expect(actualMessage).to.be.equal(message);
});

Then(/^(.*?) notification message should be displayed$/, async (message) => {
    expect(await onLoginPage.isNotificationMessageDisplayed()).to.be.true;
    const actualMessage = await onLoginPage.getNotificationMessageText();
    expect(actualMessage).to.be.equal(message);
});