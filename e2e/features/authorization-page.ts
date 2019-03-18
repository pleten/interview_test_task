import {browser} from 'protractor';
import {safeClick} from '../shared/helpers/wd-helper';
import {HeaderPo} from '../fragments/header.po';
import {AuthorizationPagePo} from '../pages/authorization.page.po';
import {HomePagePo} from '../pages/home.page.po';
import {NotificationPo} from '../fragments/notification.po';
import {TooltipPo} from '../fragments/tooltip.po';

const header = new HeaderPo();
const authorizationPage = new AuthorizationPagePo();
const homePage = new HomePagePo();
const notification = new NotificationPo();
const tooltip = new TooltipPo();

describe('Authorization tests', async () => {

    beforeEach(async () => {
        await browser.get(homePage.pageUrl);
        await homePage.assertElementDisplayed(homePage.promoBanner);
        await homePage.assertCurrentUrlContains(homePage.pageUrl);
        await safeClick(header.logInButton);
        await authorizationPage.assertElementDisplayed(authorizationPage.pageTitle);
    });

    it('Authorization page (Welcome back!)', async () => {
        await authorizationPage.sendQuery(authorizationPage.emailField, 'ssls.automation+5@gmail.com');
        await authorizationPage.sendQuery(authorizationPage.passwordField, '123456');
        await safeClick(authorizationPage.showPasswordButton);
        await header.assertElementDisplayed(authorizationPage.passwordShow);
        await safeClick(authorizationPage.loginButton);
        await header.assertElementTextContains(header.profileBox, 'ssls.automation+5@gmail.com');
        await browser.driver.manage().deleteAllCookies();
    });

    it('Authorization page. Not registered user', async () => {
        await authorizationPage.logIn('testTest@gmail.com', '123456');
        await notification.assertElementTextContains(notification.notificationMessage, 'Uh oh! Email or password is incorrect')
    });

    it(' Authorization page. Invalid email', async () => {
        await authorizationPage.logIn('eg. test@@test.com', '123456');
        await notification.assertElementTextContains(tooltip.tooltipEmailPattern, 'Uh oh! This\nisn’t an email')
    });

    it('Authorization page. Empty fields', async () => {
        await safeClick(authorizationPage.loginButton);
        await notification.assertElementTextContains(tooltip.tooltipEmailRequired, 'Oops, please\nenter your email');
        await notification.assertElementTextContains(tooltip.tooltipPasswordRequired, 'Looks like you’ve\nmissed this one')
    });

    it('Log Out.', async () => {
        await authorizationPage.logIn('ssls.automation+5@gmail.com', '123456');
        await header.logOut();
        await authorizationPage.assertElementDisplayed(authorizationPage.pageTitle);
        await authorizationPage.assertCurrentUrlContains(authorizationPage.pageUrl);
    });
});