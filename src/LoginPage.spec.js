let login = require('../PageObjects/LoginPage');

describe('Authorization page', () => {
  beforeEach(async () => {
    await login.get('https://ssls.com');
  });

  afterEach(() => {
    browser.driver.manage().deleteAllCookies();
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
  });

  it('Authorization page (Welcome back!)', async () => {
    login.fillInlogInForm('ssls.automation+5@gmail.com', '123456');
    login.clickOnEyeButton();
    expect(login.passwordField.getAttribute('value')).toEqual('123456');
    login.clickLogInButton();
    expect(login.logText.getText()).toEqual('ssls.automation+5@gmail.com');
  });

  it('Authorization page. Not registered user', async () => {
    login.fillInlogInForm('n+5@gmail.com', '12345678')
    login.clickOnEyeButton();
    expect(login.passwordField.getAttribute('value')).toEqual('12345678');
    login.clickLogInButton();
    login.waitForElementVisibility(login.notifyMessage);
    expect(login.notifyMessage.getText()).toEqual('Uh oh! Email or password is incorrect');
  });

  it('Authorization page. Not registered user', async () => {
    login.fillInlogInForm('test@@test.com', '123456')
    login.clickOnEyeButton();
    expect(login.passwordField.getAttribute('value')).toEqual('123456');
    login.clickLogInButton();
    login.waitForElementVisibility(login.leftSideTooltip);
    expect(login.leftSideTooltip.getText()).toEqual(`Uh oh! This\nisn’t an email`);
  });

  it('Authorization page. Empty fields', async () => {
    login.logInButton.click();
    login.clickLogInButton();
    login.waitForElementVisibility(login.emptyFieldsValidationError);
    expect(login.leftSideTooltip.getText()).toEqual('Oops, please\nenter your email');
    expect(login.emptyFieldsValidationError.getText()).toEqual(
      `Looks like you’ve\nmissed this one`
    );
  });

  it('Log Out.', async () => {
    login.fillInlogInForm('ssls.automation+5@gmail.com', '123456');
    login.clickLogInButton();
    login.logOut();
    await login.waitForElementVisibility(login.logInButton);
    expect(login.getUrl()).toEqual('https://www.ssls.com/authorize');
  });
});
