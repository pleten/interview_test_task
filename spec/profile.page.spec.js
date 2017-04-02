(function() {
  'use strict';

  var faker = require('faker');
  var homePage, loginPage, profilePage;

  describe('My profile page.', function() {
    beforeEach(function() {
      homePage    = require('../pages/HomePage');
      loginPage   = require('../pages/LoginPage');
      profilePage = require('../pages/ProfilePage');
    });

    beforeEach(function() {
      // 1. Log in to the user’s account
      loginPage.login();

      // In drop-down menu select "View profile"
      homePage.selectMenuItem('View profile');
    });

    it('Client area', function() {
      // Preconditions
      // get current User settings
      var profile = profilePage.getCurrentSettings();
      profilePage.logout();

      // 1. Log in to Account
      loginPage.login();

      // 2. Click on triangle near the "User@email" button
      // 3. In drop-down menu select "View profile"
      homePage.selectMenuItem('View profile');

      // After click on "View profile" opened page "Profile" should be displayed
      profilePage.verifyUrl();
      profilePage.verifyTitle();

      // Check that opened page has to contain values in the next fields and
      // compare with values from precondition
      /*
       2.1. Name
       2.2. Email
       2.3. Password (not empty)
       2.4. Phone
       2.5. Address
       2.6. Support pin
       2.7. Newsletter
       */
      profilePage.verifySettings(profile);
    });

    it('Refresh support pin', function() {
      // 3. Click "Update" button in “support pin field” to re-generation a
      // new support pin
      profilePage.updateAndVerifyPin();
    })
  });
})();
