import { browser } from 'protractor';
import { ILogin } from '../interfaces/i.login';
import { HomePage } from '../page-objects/home.page';
import { SnackBar } from '../page-objects/snackBar';
import { UserProfileDropdown } from '../page-objects/user.profile.dropdown';
import { ConsoleLog } from '../reporters/console.log';

const homePage = new HomePage();
export class NavigationController {
    static async login(loginProps: ILogin) {
        await homePage.getInstance();
        await homePage.waitForLoginButtonToBeClickable();
        const loginPage = await homePage.clickLoginButton();
        ConsoleLog.trace(`Login as [${loginProps.user.email}] user using [${loginProps.user.password}] password.`);
        await loginPage.setEmail(loginProps.user.email);
        await loginPage.setPassword(loginProps.user.password);
        loginProps.emailValidationMessage = await loginPage.tryGetEmailValidationMessage();
        loginProps.passwordValidationMessage = await loginPage.tryGetPasswordValidationMessage();
        await loginPage.clickLoginButton();
        loginProps.infoSnackBarMessage = await new SnackBar().tryGetInfoSnack();
        loginProps.errorSnackBarMessage = await new SnackBar().tryGetErrorSnack();
        loginProps.isLoginSuccessful = await homePage.isUserProfileDropdownPresent();
        ConsoleLog.trace(`Login result:`);
        console.log(loginProps);
        return loginProps;
    }

    static async logout() {
        ConsoleLog.trace(`Log out from the website.`);
        const userProfile: UserProfileDropdown = await homePage.openUserProfileDropdown();
        await userProfile.clickLogoutButton();
        await homePage.waitForLoginButtonToBeClickable();
        await this.clearBrowserCache();
    }

    static async goToCertificates() {
        ConsoleLog.trace(`Go to certificates.`);
        await homePage.clickCertsButton();
    }

    static async isUserLoggedIn() {
        let isUserLoggedIn = false;
        try {
            isUserLoggedIn = (await homePage.getUserProfileName()).includes('@');
        } catch (error) {}
        ConsoleLog.trace(`Check if user logged in - [${isUserLoggedIn}].`);
        return isUserLoggedIn;
    }

    static async clearBrowserCache() {
        ConsoleLog.warning(`Clear browser cache.`);
        await browser.executeScript('window.localStorage.clear();');
        await browser.executeScript('window.sessionStorage.clear();');
        await browser.driver.manage().deleteAllCookies();
    }
}
