(function() {
  'use strict';

  var faker = require('faker');
  var homePage, loginPage;

  describe('Authorization page.', function() {
    beforeEach(function() {
      homePage  = require('../pages/HomePage');
      loginPage = require('../pages/LoginPage');
    });

    beforeEach(function() {
      browser.getCapabilities().then(function(caps) {
        browser.browserName = caps.get('browserName');
      });
    });

    beforeEach(function() {
      // 1. Open Home page
      homePage.visit();

      // Home page has to be opened
      homePage.verifyTitle();
      homePage.verifyUrl();

      // 2. Click on "LOG IN" text
      homePage.clickLogIn();

      // Authorization page has to be opened
      loginPage.verifyTitle();
      loginPage.verifyUrl();
    });

    it('Welcome back!', function() {
      /*
       3. On the authorization page enter valid email and password for
       previously registered user (to check entered password,
       click on "eye” icon in password field.)
       */
      loginPage.setEmail();
      loginPage.setPassword();
      loginPage.showPassword();

      // After click on "eye" icon for password field, password should be
      // displayed
      loginPage.verifyPasswordVisible();

      // 4. Click "Login" button
      loginPage.clickLoginButton();

      /*
       "Log in" button has to be changed on "User@email" button (with
       dropdown menu) from the left side in the Header of the page
       */
      homePage.verifyUserEmailLinkPresent();
      homePage.verifyLoginLinkPresence(false);
    });

    it('Not registered user', function() {
      var email    = faker.internet.email();
      var password = faker.internet.password();

      // 3. On the authorization page enter not registered email and any
      // password
      loginPage.setEmail(email);
      loginPage.setPassword(password);

      // FIXME: step not present, but expected result is!
      loginPage.showPassword();

      // After click on "eye" icon for password field, password should be
      // displayed
      loginPage.verifyPasswordVisible(password);

      // 4. Click "Login" button
      loginPage.clickLoginButton();

      /*
       If user not registered, error message such as:
       “Uh oh! Email or password is incorrect" should be displayed
       */
      loginPage.verifyNotification('Uh oh! Email or password is incorrect');
    });

    it('Invalid email', function() {
      // 3. On the authorization page enter invalid email and valid password
      loginPage.setEmail('ssls.automation @gmail.com');
      loginPage.setPassword();

      // FIXME: step not present, but expected result is!
      loginPage.showPassword();

      // After click on "eye" icon for password field, password should be
      // displayed
      loginPage.verifyPasswordVisible();

      // 4. Click "Login" button
      loginPage.clickLoginButton();

      /*
       If user filled "Email" field with non-email value (eg. test@@test.com)
       error message such as: “Uh oh! This isn’t an email" should be displayed
       */
      loginPage.verifyInvalidEmailTooltip("Uh oh! This isn’t an email");
    });

    it('Empty fields', function() {
      // 3. On the authorization page don’t fill Email and Password
      // 4. Click "Login" button
      loginPage.clickLoginButton();

      /*
       If user filled "Email" field with non-email value (eg. test@@test.com)
       error message such as: “Uh oh! This isn’t an email" should be displayed
       */
      loginPage.verifyEmptyEmailTooltip(
        "Oops, please enter your email"
      );

      loginPage.verifyEmptyPasswordTooltip(
        "Looks like you’ve missed this one"
      );
    });

    it('Log Out', function() {
      // User has to be logged in
      loginPage.login();

      //Click on triangle near the "User@email" button and
      // select “Log out”
      homePage.logout();

      // After click "Log out" user should log out and
      // redirected on authorization page
      homePage.verifyLoginLinkPresence(true);
      loginPage.verifyTitle();
      loginPage.verifyUrl();
    });
  });
})();
