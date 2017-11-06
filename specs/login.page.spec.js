import LoginPage from '../pages/login-page';
const config = require('../config.json');
let loginPage = new LoginPage();

describe('Tests for Login Page', ()=> {
  beforeAll(()=>{
    return loginPage.goToHomePage();
  });

    it('should check if we visited rigth web site', ()=> {
      expect(loginPage.getBrowserUrl()).toEqual('https://www.ssls.com/');
    });

    it('should go to login page', ()=> {
      return loginPage.goToLoginPage()
        .then(() => expect(loginPage.getBrowserUrl()).toEqual('https://www.ssls.com/authorize'));
    });

    it('should check if password was entered before login', () => {
      return loginPage.checkEnteredCredentials(config.correctCredentials.email, config.correctCredentials.password)
        .then(() => expect(loginPage.returnPasswordInputField()).toBe('text'));
    });

    it('should make login to web site with correct credentials', () => {
      return loginPage.makeWebSiteLogin()
        .then(() => expect(loginPage.getBrowserUrl()).toEqual('https://www.ssls.com/'));
    });

    it('should check if profile dropdown is present after correct login', () => {
      expect(loginPage.returnProfileButton().getText()).toEqual(config.correctCredentials.email);
    });

    it("check error message text if we use non existing credentials", () => {
      loginPage.doLogOut();
      loginPage.checkEnteredCredentials(config.notRegisteredCredentials.email, config.notRegisteredCredentials.password);
      loginPage.makeWebSiteLogin();
      browser.wait(() => {
        return loginPage.checkErrorMessageText().isPresent();
      });
      expect(loginPage.checkErrorMessageText().getText()).toEqual('Uh oh! Email or password is incorrect');
    });

    it("check error message text if we enter invalid email", () => {
      loginPage.goToHomePage();
      loginPage.goToLoginPage();
      loginPage.checkEnteredCredentials(config.notRegisteredCredentials.email, config.correctCredentials.password);
      loginPage.makeWebSiteLogin();
      browser.wait(() => {
        return loginPage.checkErrorMessageText().isPresent();
      });
      expect(loginPage.checkErrorMessageText().getText()).toEqual('Uh oh! Email or password is incorrect');
    });

    it("check error message text of toolitps", () => {
      loginPage.goToHomePage();
      loginPage.goToLoginPage();
      loginPage.makeWebSiteLogin();
      loginPage.returnTooltipsErrors().get(1).getText().then((text) => {
        expect(text.replace("\n", " ")).toEqual('Oops, please enter your email');
      });
      loginPage.returnTooltipsErrors().get(2).getText().then((text) => {
        expect(text.replace("\n", " ")).toEqual('Looks like you’ve missed this one');
      });
    });

    it('should test logout', () => {
      loginPage.goToHomePage();
      loginPage.goToLoginPage();
      loginPage.checkEnteredCredentials(config.correctCredentials.email, config.correctCredentials.password);
      loginPage.makeWebSiteLogin();
      loginPage.doLogOut();
      expect(loginPage.getBrowserUrl()).toEqual('https://www.ssls.com/authorize');
    });
});



