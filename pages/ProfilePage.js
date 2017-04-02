(function() {
  'use strict';

  var BasePage = require('./BasePage');

  function ProfilePage() {
    this.title = 'My Profile | SSLs.com';
    this.URL   = '/user/profile'
  }

  ProfilePage.prototype.__proto__   = BasePage.prototype;
  ProfilePage.prototype.constructor = ProfilePage;

  ProfilePage.prototype.getCurrentSettings = function() {
    var profileForm  = $('.profile-content');
    var userSettings = {};

    userSettings.name         = profileForm.element(by.binding('user.firstName'));
    userSettings.email        = profileForm.element(by.binding('user.email'));
    userSettings.phone        = profileForm.element(by.binding('user.phone.number'));
    userSettings.address      = profileForm.element(by.binding('user.address'));
    userSettings.supportPin   = profileForm.element(by.binding('user.supportPin'));
    userSettings.newsletterOn = profileForm.$('[name="newsletterOn"]');

    return userSettings;
  };

  ProfilePage.prototype.verifySettings = function(profile) {
    var currentSettings = this.getCurrentSettings();

    for (var prop in currentSettings) {
      if(prop === 'newsletterOn'){
        expect(currentSettings[prop].isSelected())
          .toBe(profile[prop].isSelected());
      } else {
        expect(currentSettings[prop].getText())
          .toBe(profile[prop].getText());
      }
    }

    expect(element(by.binding('user.password')).getText()).toBeTruthy();
  };

  ProfilePage.prototype.updateAndVerifyPin = function(profile) {
    var profileForm = $('.profile-content');
    var oldPin      = profileForm.element(by.binding('user.supportPin')).getText();

    element(by.model('user.supportPin')).click();
    expect(profileForm.element(by.binding('user.supportPin')).getText())
      .not.toBe(oldPin);
  };


  module.exports = new ProfilePage();
})();
