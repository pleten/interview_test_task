import { browser } from 'protractor';
import { NavigationController } from '../framework/controllers/navigation.controller';
import { ILogin } from '../framework/interfaces/i.login';
import { User } from '../framework/models/user.model';
import { HomePage } from '../framework/page-objects/home.page';
import { ScreenShot } from '../framework/reporters/screenshot';

describe('user.authorization', () => {
    const homePage = new HomePage();

    const testUser = new User('ssls.automation+5@gmail.com', '123456');
    const notRegisteredUser = new User('notRegisteredUser@gmail.com', '123456');
    const invalidEmailUser = new User('invalidEmail', '123456');
    const emptyUser = new User(' ', ' ');

    it(`1. Authorization page (Welcome back!)`, async () => {
        await homePage.getInstance();
        expect(await homePage.isOpened()).toBeTruthy();
        await ScreenShot.save('1_homePage');
        const loginPage = await homePage.clickLoginButton();
        expect(await loginPage.isOpened()).toBeTruthy();
        await ScreenShot.save('1_loginPage');
        await loginPage.setEmail(testUser.email);
        await loginPage.setPassword(testUser.password);
        await loginPage.clickShowPasswordButton();
        expect(await loginPage.getPassword()).toEqual(testUser.password);
        await ScreenShot.save('1_checkUserPassword');
        await loginPage.clickLoginButton();
        expect(await homePage.getUserProfileName()).toEqual(testUser.email);
        expect(await homePage.isUserProfileDropdownPresent()).toBeTruthy();
        await ScreenShot.save('1_userProfile');
        await NavigationController.logout();
    });
    it(`2. Authorization page. Not registered user`, async () => {
        const loginProps: ILogin = { user: notRegisteredUser };
        await NavigationController.login(loginProps);
        expect(loginProps.infoSnackBarMessage).toEqual('Uh oh! Email or password is incorrect');
    });
    it(`3. Authorization page. Invalid email`, async () => {
        const loginProps: ILogin = { user: invalidEmailUser };
        await NavigationController.login(loginProps);
        expect(loginProps.emailValidationMessage).toEqual('Uh oh! This\nisn’t an email');
    });
    it(`4. Authorization page. Empty fields`, async () => {
        const loginProps: ILogin = { user: emptyUser };
        await NavigationController.login(loginProps);
        expect(loginProps.emailValidationMessage).toEqual('Oops, please\nenter your email');
        expect(loginProps.passwordValidationMessage).toEqual('Looks like you’ve\nmissed this one');
    });
    it(`5. Log Out.`, async () => {
        await NavigationController.login({ user: testUser });
        expect(await NavigationController.isUserLoggedIn()).toBeTruthy();
        await NavigationController.logout();
        expect(await NavigationController.isUserLoggedIn()).toBeFalsy();
        expect(await browser.getCurrentUrl()).toBe('https://www.ssls.com/authorize');
    });
});
