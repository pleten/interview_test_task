var Home = require('../pages/homePage');
var Login = require('../pages/loginPage');
var UserDropDown = require('../pageFragments/userDropDown');
var testData = require('../testData');

describe('Authorization page', function () {

  var homePage;
  var loginPage;
  var userDropDown;
  var EC = protractor.ExpectedConditions;

  beforeEach(async function () {
    homePage = await new Home();
    loginPage = await new Login();
    userDropDown = await new UserDropDown();

    await browser.get(testData.url);
  });

  it('Welcome back!', async function () {

    expect(await browser.getTitle()).toEqual('SSL Certificates—Buy Cheap SSL Certs & Save 52%');

    await homePage.clickLoginButton();
    expect(await browser.getTitle()).toEqual('Sign In | SSLs.com');

    await loginPage.enterEmail(testData.validEmail);
    await loginPage.enterPassword(testData.validPassword);
    await loginPage.showPassword();
    expect(await loginPage.getPassword()).toEqual(testData.validPassword);
    await loginPage.clickLoginButton();

    expect(await homePage.getLoginButton().isPresent()).toBe(false);
    expect(await userDropDown.getUserDropDown().isPresent()).toBe(true);
    expect(await userDropDown.getUserButton().getText()).toEqual(testData.validEmail);
  });

  it('Not registered user', async function () {

    expect(await browser.getTitle()).toEqual('SSL Certificates—Buy Cheap SSL Certs & Save 52%');

    await homePage.clickLoginButton();
    expect(await browser.getTitle()).toEqual('Sign In | SSLs.com');

    await loginPage.enterEmail(testData.invalidEmail);
    await loginPage.enterPassword(testData.invalidPassword);
    await loginPage.showPassword();
    expect(await loginPage.getPassword()).toEqual(testData.invalidPassword);
    await loginPage.clickLoginButton();

    await browser.wait(
      await EC.textToBePresentInElement(
        await loginPage.getInvalidCredentialsErrorMessage(), "Uh oh! Email or password is incorrect"), 3000);
  });

  it('Invalid email', async function () {

    expect(await browser.getTitle()).toEqual('SSL Certificates—Buy Cheap SSL Certs & Save 52%');

    await homePage.clickLoginButton();
    expect(await browser.getTitle()).toEqual('Sign In | SSLs.com');

    await loginPage.enterEmail("test@@test.com");
    await loginPage.enterPassword(testData.validPassword);
    await loginPage.showPassword();
    expect(await loginPage.getPassword()).toEqual(testData.validPassword);
    await loginPage.clickLoginButton();

    var invalidEmailError = await loginPage.getEmailErrorMessage().getText();
    expect(invalidEmailError.trim()).toEqual("Uh oh! This\nisn’t an email");
  });

  it('Empty fields', async function () {

    expect(await browser.getTitle()).toEqual('SSL Certificates—Buy Cheap SSL Certs & Save 52%');

    await homePage.clickLoginButton();
    expect(await browser.getTitle()).toEqual('Sign In | SSLs.com');

    await loginPage.enterEmail("");
    await loginPage.enterPassword("");
    await loginPage.clickLoginButton();

    var emailError = await loginPage.getEmailErrorMessage().getText();
    expect(emailError.trim()).toEqual("Oops, please\nenter your email");

    var passwordError = await loginPage.getPasswordErrorMessage().getText();
    expect(passwordError.trim()).toEqual("Looks like you’ve\nmissed this one");
  });

  it('Log Out', async function () {

    await homePage.clickLoginButton();
    await loginPage.enterEmail(testData.validEmail);
    await loginPage.enterPassword(testData.validPassword);
    await loginPage.clickLoginButton();
    await userDropDown.logOut();

    expect(await browser.getTitle()).toEqual('Sign In | SSLs.com');
    expect(await browser.getCurrentUrl()).toEqual('https://www.ssls.com/authorize');
  });

});