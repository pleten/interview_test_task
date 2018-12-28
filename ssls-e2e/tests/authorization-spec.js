let autorizationPage = require('../page-objects/autorization-page');
let commonPage = require('../page-objects/common-page');
let headerPage = require('../page-objects/header-page');
let applicationTestData = require('../data');

describe('Authorization page', function () {

  beforeEach(function () {
    browser.get(applicationTestData.baseUrl);
  });

  afterEach(function () {
    commonPage.refreshBrowser();
  });

  it('Welcome back', async function () {

    console.log('Checking correct navigation to the base page');
    expect(await browser.getCurrentUrl()).toEqual('https://www.ssls.com/');

    console.log('Clicking on log in text and check correct page opened');
    headerPage.clickLogInText();
    expect(await browser.getCurrentUrl()).toEqual('https://www.ssls.com/authorize');

    console.log('Fill user credentials to fields and check filled correct password after clicking on "eye" button');
    autorizationPage.fillLogInForm(applicationTestData.credentials.email, applicationTestData.credentials.password);
    autorizationPage.clickOnEyeButton();
    expect(await autorizationPage.passwordInput.getAttribute('value')).toEqual(applicationTestData.credentials.password);

    console.log('"Log in" button has to be changed on "ssls.automation+5@gmail.com" button (with dropdown menu) from the left side in the Header of the page');
    autorizationPage.clickLogInButton();
    expect(headerPage.logInButtonAfterLogIn.getText()).toEqual(applicationTestData.credentials.email);
    expect(headerPage.userMenu.isPresent()).toBe(true);
  });

  it('Not registered user', async function () {

    console.log('Home page has to be opened');
    expect(await browser.getCurrentUrl()).toEqual('https://www.ssls.com/');

    console.log('Authorization page has to be opened');
    headerPage.clickLogInText();
    expect(await browser.getCurrentUrl()).toEqual('https://www.ssls.com/authorize');

    console.log('After click on "eye" icon for password field, password should be displayed');
    autorizationPage.fillLogInForm('anyEmail@gmail.com', 'anyPwd');
    autorizationPage.clickOnEyeButton();
    expect(await autorizationPage.passwordInput.getAttribute('value')).toEqual('anyPwd');

    console.log(`If user not registered, errors messages such as: “Uh oh! Email or password is incorrect” should be displayed`);
    autorizationPage.clickLogInButton();
    commonPage.waitForElementStabilized(autorizationPage.notifyText);
    expect(await autorizationPage.notifyText.getText()).toEqual('Uh oh! Email or password is incorrect');
  });

  it('Invalid email', async function () {

    console.log('Home page has to be opened');
    expect(await browser.getCurrentUrl()).toEqual('https://www.ssls.com/');

    console.log('Authorization page has to be opened');
    headerPage.clickLogInText();
    expect(await browser.getCurrentUrl()).toEqual('https://www.ssls.com/authorize');

    console.log('After click on "eye" icon for password field, password should be displayed');
    autorizationPage.fillLogInForm('test@@test.com', applicationTestData.credentials.password);
    autorizationPage.clickOnEyeButton();
    expect(await autorizationPage.passwordInput.getAttribute('value')).toEqual(applicationTestData.credentials.password);

    console.log(`If user filled "Email" field with non-email value (eg. test@@test.com) error message such as: “Uh oh! This isn’t an email should be displayed”`);
    autorizationPage.clickLogInButton();
    expect(await autorizationPage.wrongEmailErrorMessage.getText()).toEqual(`Uh oh! This\nisn’t an email`);
  });

  it('Empty fields', async function () {

    console.log('Home page has to be opened');
    expect(await browser.getCurrentUrl()).toEqual('https://www.ssls.com/');

    console.log('Authorization page has to be opened');
    headerPage.clickLogInText();
    expect(await browser.getCurrentUrl()).toEqual('https://www.ssls.com/authorize');

    console.log(`If user not filled all fields, errors messages such as: 
    3.1. For Email field: “Oops, please enter your email”
    3.2. For Password field: “Looks like you’ve missed this one should be displayed”`);
    autorizationPage.clickLogInButton();
    expect(await autorizationPage.wrongEmailErrorMessage.getText()).toEqual(`Oops, please\nenter your email`);
    expect(await autorizationPage.wrongPasswordErrorMessage.getText()).toEqual(`Looks like you’ve\nmissed this one`);
  });

  it('Log Out', async function () {

    console.log('Preconditions for log out');
    headerPage.clickLogInText();
    autorizationPage.fillLogInForm(applicationTestData.credentials.email, applicationTestData.credentials.password);
    autorizationPage.clickOnEyeButton();
    expect(await autorizationPage.passwordInput.getAttribute('value')).toEqual(applicationTestData.credentials.password);
    autorizationPage.clickLogInButton();

    console.log('After click "Log out" user should log out and  redirected on authorization page');
    headerPage.choseOptionInUserDropDown('Log out');
    expect(await browser.getCurrentUrl()).toEqual('https://www.ssls.com/authorize');
  });
});