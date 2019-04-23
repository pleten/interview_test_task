import HomePage from '../pages/homePage';
import AuthPage from '../pages/authPage';
import testData from '../data/testData';

describe('Tests for the \'Authorization\' page', function() {

    beforeEach(function() {
        HomePage.open();
      });
    
    it('Test: Login with Empty fields', function() {
        expect(browser.getTitle()).toEqual(HomePage.title);
        HomePage.btnLogin.click();
        AuthPage.titleIs(AuthPage.title);
        expect(browser.getTitle()).toEqual(AuthPage.title);
        AuthPage.inputEmail.clear();
        AuthPage.inputPass.clear();
        AuthPage.btnLogin.click();
        expect(AuthPage.errorEmptyEmail.getText()).toEqual(testData.errorTextEmptyEmail);
        expect(AuthPage.errorEmptyPass.getText()).toEqual(testData.errorTextEmptyPass);
    });

    it('Test: Login with Invalid email', function() {
        expect(browser.getTitle()).toEqual(HomePage.title);
        HomePage.btnLogin.click();
        AuthPage.titleIs(AuthPage.title);
        expect(browser.getTitle()).toEqual(AuthPage.title);
        AuthPage.inputEmail.clear();
        AuthPage.inputEmail.sendKeys(testData.invalidEmail)
        expect(AuthPage.errorInvalidEmail.getText()).toEqual(testData.errorTextInvalidEmail);
        AuthPage.inputPass.clear();
        AuthPage.inputPass.sendKeys(testData.validPass)
        AuthPage.btnShowPass.click();
        expect(AuthPage.inputPass.getAttribute('value')).toEqual(testData.validPass);
        AuthPage.btnLogin.click();
        
    });

    it('Test: Login as a Not registered user', function() {
        expect(browser.getTitle()).toEqual(HomePage.title);
        HomePage.btnLogin.click();
        AuthPage.titleIs(AuthPage.title);
        expect(browser.getTitle()).toEqual(AuthPage.title);
        AuthPage.inputEmail.clear();
        AuthPage.inputEmail.sendKeys(testData.notRegisteredEmail)
        AuthPage.inputPass.clear();
        AuthPage.inputPass.sendKeys(testData.notRegisteredPass)
        AuthPage.btnShowPass.click();
        expect(AuthPage.inputPass.getAttribute('value')).toEqual(testData.notRegisteredPass);
        AuthPage.btnLogin.click();
        AuthPage.hasText(AuthPage.errorIncorrectEmailPass, testData.errorTextIncorrectEmailPass);
        expect(AuthPage.errorIncorrectEmailPass.getText()).toEqual(testData.errorTextIncorrectEmailPass);
        
    });

    it('Test: Login as a Registered user', function() {
        expect(browser.getTitle()).toEqual(HomePage.title);
        HomePage.btnLogin.click();
        AuthPage.titleIs(AuthPage.title);
        expect(browser.getTitle()).toEqual(AuthPage.title);
        AuthPage.inputEmail.clear();
        AuthPage.inputEmail.sendKeys(testData.validEmail)
        AuthPage.inputPass.clear();
        AuthPage.inputPass.sendKeys(testData.validPass)
        AuthPage.btnShowPass.click();
        expect(AuthPage.inputPass.getAttribute('value')).toEqual(testData.validPass);
        AuthPage.btnLogin.click();
        HomePage.titleIs(HomePage.title);
        expect(browser.getTitle()).toEqual(HomePage.title);
        expect(HomePage.btnLogin.isPresent()).toBe(false);
        expect(HomePage.btnUser.isPresent()).toBe(true);
        expect(HomePage.btnUser.getText()).toEqual(testData.validEmail);
        
    });

    it('Test: Log Out', function() {
        HomePage.btnLogin.click();
        AuthPage.titleIs(AuthPage.title);
        AuthPage.login(testData.validEmail, testData.validPass);
        HomePage.titleIs(HomePage.title);
        HomePage.logout();
        expect(browser.getTitle()).toEqual(AuthPage.title);
        
    });

    afterEach(function() {
        AuthPage.clearBrowserStorage();
      });

  });