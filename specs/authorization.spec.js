(function(){
  'use strict';
  var homePage  = require('../pages/HomePage');
  var loginPage = require('../pages/LoginPage');

  describe('Authorization page', function(){
    it('Welcome back!', function(){
      var email = 'ssls.automation+5@gmail.com';
      var password = 123456;

      // Home page has to be opened
      homePage.verifyTitle();
      homePage.verifyUrl();

      // 2. Click on "LOG IN" text
      homePage.clickLogIn();
      // Authorization page has to be opened
      loginPage.verifyTitle();
      loginPage.verifyUrl();

      /*
       3. On the authorization page enter valid email and password for
       previously registered user (to check entered password,
       click on "eye” icon in password field.)
       */
      loginPage.set_email(email);
      loginPage.set_password(password);
      loginPage.show_password();

      // After click on "eye" icon for password field, password should be displayed
      loginPage.verify_password_visible();

      // 4. Click "Login" button
      loginPage.click_login_button();

      /*
       "Log in" button has to be changed on "User@email" button (with
       dropdown menu) from the left side in the Header of the page
       */
      homePage.verifyUserEmailLinkPresent(email);
      homePage.verifyLoginLinkNotPresent();
    });
  });
})();
