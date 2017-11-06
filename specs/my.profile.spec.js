import LoginPage from '../pages/login-page';
import MyProfilePage from  '../pages/my-profile-page';
const config = require('../config.json');
let loginPage = new LoginPage();
let myProfilePage = new MyProfilePage();

describe('Test For My Profile Page', () => {
  beforeAll(()=>{
    return loginPage.goToHomePage();
  });

    it('should go to View profile page', () => {
      return loginPage.goToLoginPage()
        .then(() => loginPage.checkEnteredCredentials(config.correctCredentials.email, config.correctCredentials.password))
        .then(() => loginPage.makeWebSiteLogin())
        .then(() => loginPage.clickOnOpenDropDownButton())
        .then(() => myProfilePage.goToViewProfile())
        .then(() => expect(browser.getCurrentUrl()).toEqual('https://www.ssls.com/user/profile'));
    });

    it('should verify user data', () => {
      expect(myProfilePage.returnAllUserDataInformation().get(0).getText()).toEqual('Vasya Pupkin');
      expect(myProfilePage.returnAllUserDataInformation().get(1).getText()).toEqual('ssls.automation+5@gmail.com');
      expect(myProfilePage.returnAllUserDataInformation().get(2).getText()).toEqual('*****');
      expect(myProfilePage.returnAllUserDataInformation().get(3).getText()).toEqual('+380 57123456789');
      expect(myProfilePage.returnAllUserDataInformation().get(4).getText()).toEqual('Diagon alley 2, Misto, Uryupinsk 612120, Ukraine');
    });

    it('should refresh support pin', () => {
      let oldPin, newPin;
      return myProfilePage.returnAllUserDataInformation().get(5).getText()
        .then((text) => oldPin = text)
        .then(() => myProfilePage.refreshPin())
        .then(() => myProfilePage.returnAllUserDataInformation().get(5).getText())
        .then((text) => newPin = text)
        .then(() => expect(newPin).not.toBe(oldPin));
    });
});
