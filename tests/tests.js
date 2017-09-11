
var webdriver = require('selenium-webdriver'),

    WebLibrary = require('../libs/WebLibrary'),
    LoginPage = require('../pages/LoginPage'),
    ProfilePage = require('../pages/ProfilePage'),
    Nawigation = require('../pages/NawigationBarPage'),
    utils = require('../utils/utils'),
    test = require('selenium-webdriver/testing'),
    assert = require('assert'),
    should = require('chai').should(),
    expect = require('chai'),
    By = webdriver.By;


var lib,
    loginPage,
    profilePage,
    nawigation,
    driver;


test.describe('QA automation Test', () => {

    loginPage = new LoginPage(driver);
    profilePage = new ProfilePage(driver);
    nawigation = new Nawigation(driver);


    test.beforeEach( async () => {

        driver = new webdriver.Builder().forBrowser(utils.browser).build();

        driver.manage().timeouts().implicitlyWait(7000/*ms*/);

        lib = new WebLibrary(driver);

        await lib.openHomePage();

    });

    test.afterEach( () => {
        driver.quit();
    });


    // -------------------------------------------------------
    test.it('1. Authorization page (Welcome back!)', async () =>  {

        nawigation = new Nawigation(driver);
        await nawigation.openLoginPage();

        loginPage = new LoginPage(driver);
        await lib.checkWebElementTextMatching(await loginPage.loginSubmitButton(), "LOGIN");

        await lib.inputTextInWebElement(await loginPage.emailField(), utils.user1.email);
        await lib.inputTextInWebElement(await loginPage.passwordField(), utils.user1.pass);

        //Open password by clicking on eyeIcon
        loginPage = new LoginPage(driver);
        await loginPage.clickOnEyeIcon();

        //Checking if the password is visible
        await loginPage.checkPasswordIsOpen();

        await lib.clickWebElement(await loginPage.loginSubmitButton());

        //Checking if the LOGIN button is hidden
        let presenceOfLoginButton = await nawigation.checkThatNoLoginButton();
        presenceOfLoginButton.should.equal(false);
    });


    test.it('2. Authorization page. Not registered user', async () =>  {

        nawigation = new Nawigation(driver);
        await nawigation.openLoginPage();

        loginPage = new LoginPage(driver);
        await lib.checkWebElementTextMatching(await loginPage.loginSubmitButton(), "LOGIN");

        //Input invalid credentials and send form
        await lib.inputTextInWebElement(await loginPage.emailField(), utils.user1.email);
        await lib.inputTextInWebElement(await loginPage.passwordField(), "111111");
        await lib.clickWebElement(await loginPage.loginSubmitButton());

        await loginPage.clickOnEyeIcon();

        await loginPage.checkPasswordIsOpen();

        // Check that user is logged out
        await lib.checkWebElementTextMatching(await loginPage.errorNotification(), utils.wrongCredantialsMessage);
        await lib.checkWebElementTextMatching(await loginPage.loginSubmitButton(), "LOGIN");
        await lib.clickWebElement(await loginPage.errorNotification());
    });


    test.it('5. Log Out.', async () =>  {

        nawigation = new Nawigation(driver);
        await nawigation.openLoginPage();

        loginPage = new LoginPage(driver);
        await loginPage.login();
        await nawigation.logOut();

        //Check that user is logged out
        await lib.checkWebElementTextMatching(await loginPage.authorizationText(), "Authorization");
        await lib.checkWebElementTextMatching(await nawigation.loginButton(), "LOG IN");
    });


    test.it('6. My profile page. Client area', async () =>  {

        nawigation = new Nawigation(driver);
        await nawigation.openLoginPage();

        loginPage = new LoginPage(driver);
        await loginPage.login();

        await nawigation.openProfile();
        profilePage = new ProfilePage(driver);

        // Get values of user data in profile
        let nameValue = await lib.getText(await profilePage.nameValue());
        let emailValue = await lib.getText(await profilePage.emailValue());
        let phoneValue = await lib.getText(await profilePage.phoneValue());
        let addressValue = await lib.getText(await profilePage.addressValue());
        let pinValue = await lib.getText(await profilePage.pinTextElement());
        let newsLetterValue = await lib.getAttribute(await profilePage.newsLetterValue(), "className");

        //Logout and login
        await nawigation.logOut();
        await nawigation.openLoginPage();
        await loginPage.login();
        await nawigation.openProfile();

        //Comparing the values with saved ones
        await lib.checkWebElementTextMatching(await profilePage.nameValue(), nameValue);
        await lib.checkWebElementTextMatching(await profilePage.emailValue(), emailValue);
        await lib.checkWebElementTextMatching(await profilePage.phoneValue(), phoneValue);
        await lib.checkWebElementTextMatching(await profilePage.addressValue(), addressValue);
        await lib.checkWebElementTextMatching(await profilePage.pinTextElement(), pinValue);
        let newNewsLetterValue = await lib.getAttribute(await profilePage.newsLetterValue(), "className");
        newNewsLetterValue.should.equal(newsLetterValue);

    });


    test.it('7. My profile page. Refresh support pin', async () =>  {

        nawigation = new Nawigation(driver);
        await nawigation.openLoginPage();

        loginPage = new LoginPage(driver);
        await loginPage.login();

        await nawigation.openProfile();
        profilePage = new ProfilePage(driver);


        //Saving pin value
        let pin = await lib.getText(await profilePage.pinTextElement());
        // console.log(pin);
        await profilePage.clickRefreshPIN();

        //Get new pin value and comparing with saved one
        let newPin = await lib.getText(await profilePage.pinTextElement());
        // console.log(newPin);
        !pin.should.not.equal(newPin);

    });

});