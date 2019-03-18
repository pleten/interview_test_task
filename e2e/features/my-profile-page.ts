import {browser} from 'protractor';
import {safeClick} from '../shared/helpers/wd-helper';
import {elementIsVisible} from '../shared/helpers/js-helper';
import {HeaderPo} from '../fragments/header.po';
import {AuthorizationPagePo} from '../pages/authorization.page.po';
import {HomePagePo} from '../pages/home.page.po';
import {ProfilePagePo} from '../pages/profile.page.po';
import {expect} from 'chai';

const header = new HeaderPo();
const authorizationPage = new AuthorizationPagePo();
const profilePage = new ProfilePagePo();
const homePage = new HomePagePo();

describe('My profile page', async () => {

    beforeEach(async () => {
        await browser.get(homePage.pageUrl);
        await safeClick(header.logInButton);
        await authorizationPage.logIn('ssls.automation+5@gmail.com', '123456');
    });

    it('My profile page. Client area', async () => {
        await header.openProfile();
        profilePage.nameValue = await profilePage.nameField.getText();
        profilePage.emailValue = await profilePage.emailField.getText();
        profilePage.passwordValue = await profilePage.passwordField.getText();
        profilePage.phoneValue = await profilePage.phoneField.getText();
        profilePage.addressValue = await profilePage.addressField.getText();
        profilePage.supportPinValue = await profilePage.supportPinField.getText();
        profilePage.newsletterValue = await elementIsVisible(profilePage.newsletterOn);
        await header.logOut();
        await safeClick(header.logInButton);
        await authorizationPage.logIn('ssls.automation+5@gmail.com', '123456');
        await header.openProfile();
        await profilePage.assertElementTextContains(profilePage.nameField, profilePage.nameValue);
        await profilePage.assertElementTextContains(profilePage.emailField, profilePage.emailValue);
        await profilePage.assertElementTextContains(profilePage.passwordField, profilePage.passwordValue);
        await profilePage.assertElementTextContains(profilePage.phoneField, profilePage.phoneValue);
        await profilePage.assertElementTextContains(profilePage.addressField, profilePage.addressValue);
        await profilePage.assertElementTextContains(profilePage.supportPinField, profilePage.supportPinValue);
        await profilePage.assertValuesEquals(await elementIsVisible(profilePage.newsletterOn), profilePage.newsletterValue);
        await browser.driver.manage().deleteAllCookies();
    });

    it('My profile page. Refresh support pin', async () => {
        await header.openProfile();
        profilePage.supportPinValue = await profilePage.supportPinField.getText();
        await safeClick(profilePage.updateSupportPin);
        await profilePage.assertElementTextNotEquals(profilePage.supportPinValue, await profilePage.supportPinField.getText());
    });
});