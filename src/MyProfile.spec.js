let profile = require('../PageObjects/MyProfilePage');
let login = require('../PageObjects/LoginPage');

describe('My Profile page', () => {
  beforeEach(async () => {
    await login.get('https://ssls.com');
    login.fillInlogInForm('ssls.automation+5@gmail.com', '123456');
    login.clickLogInButton();
  });

  afterEach(() => {
    browser.driver.manage().deleteAllCookies();
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
  });

  it('My profile page. Client area', async () => {
    await profile.openViewProfile();
    expect(profile.name.getText()).toEqual('Vasya Pupkin');
    expect(profile.email.getText()).toEqual('ssls.automation+5@gmail.com');
    expect(profile.password.getText()).toEqual('*****');
    expect(profile.phone.getText()).toEqual('+380 57123456789');
    expect(profile.address.getText()).toEqual('Diagon alley 2, Misto, Uryupinsk 612120, Ukraine');
    expect(profile.newsletter.getText()).toEqual('Include in mailing list');
    expect(profile.pin.getText().length).not.toEqual(0);
  });

  it('My profile page. Refresh support pin', async () => {
    await profile.openViewProfile();
    let prev = profile.pin.getText();
    profile.refreshPin.click();
    expect(profile.pin.getText()).not.toEqual(prev);
  });
});
