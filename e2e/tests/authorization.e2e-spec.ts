import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { Notification } from '../pages';
import { browser } from 'protractor';
import { validUser, notRegisteredUser, invalidEmailUser } from '../data/credentials';

describe('Authorizatin page', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let noty: Notification;

  beforeEach(async () => {
    loginPage = new LoginPage();
    homePage = new HomePage();
    noty = new Notification();

    await homePage.open();
    await homePage.gotoLoginPage();
  });

  afterEach(async () => {
    // clear cookies to force logout
    await browser.driver.manage().deleteAllCookies();
  });

  it('Successful login', async () => {
    await loginPage.loginForm.fillForm(validUser.email, validUser.password);
    await loginPage.loginForm.showPassword();

    expect(await loginPage.loginForm.isPasswordVisible()).toBeTruthy('Password is not visible');
  
    await loginPage.loginForm.submitForm();

    return expect(await homePage.loginBtn.getText()).toEqual(validUser.email);
  });

  it('Show error if user is not registered', async () => {
    const expectedError = 'Uh oh! Email or password is incorrect';

    await browser.get(`${browser.baseUrl}/authorize`)
    await loginPage.loginForm.fillForm(notRegisteredUser.email, notRegisteredUser.password);
    await loginPage.loginForm.showPassword();
    
    expect(await loginPage.loginForm.isPasswordVisible()).toBeTruthy('Password is not visible');
  
    await loginPage.loginForm.submitForm();

    expect(await noty.allNotifications.count()).toEqual(1);    
    return expect(await noty.getText()).toEqual(expectedError);
  });

  it('Show error tooltip if email is invalid', async () => {
    const expectedError = `Uh oh! This\nisn’t an email`;

    await loginPage.loginForm.fillForm(invalidEmailUser.password, invalidEmailUser.email);
    await loginPage.loginForm.showPassword();
    
    expect(await loginPage.loginForm.isPasswordVisible()).toBeTruthy('Password is not visible');
  
    await loginPage.loginForm.submitForm();

    return expect(await loginPage.loginForm.emailError.getText()).toEqual(expectedError);
  });

  it('Show error tooltip for empty fields', async () => {
    const expectedEmailError = `Oops, please\nenter your email`;
    const expectedPswdError = `Looks like you’ve\nmissed this one`;

    await loginPage.loginForm.submitForm();

    expect(await loginPage.loginForm.emailError.getText()).toEqual(expectedEmailError);
    return expect(await loginPage.loginForm.passwordError.getText()).toEqual(expectedPswdError);
  });

  it('LogOut', async () => {
    await loginPage.loginUser(validUser);
    await homePage.logOut();

    return expect(await browser.getCurrentUrl()).toEqual(loginPage.url);
  });
});