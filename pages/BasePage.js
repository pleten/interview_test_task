(function() {
  'use strict';

  function BasePage() {}

  BasePage.prototype.defaultEmail    = 'ssls.automation+5@gmail.com';
  BasePage.prototype.defaultPassword = '123456';

  BasePage.prototype.verifyTitle = function() {
    expect(browser.getTitle()).toEqual(this.title);
  };

  BasePage.prototype.verifyUrl = function() {
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + this.URL);
  };

  BasePage.prototype.visit = function() {
    browser.get(this.URL);
  };

  BasePage.prototype.loginLink = function() {
      var link = 'Log in';

      link = browser.browserName === 'chrome' ? link.toUpperCase() : link;

      return $('header').element(by.linkText(link));
  };

  BasePage.prototype.notificationContainer = function() {
    return $('.noty_text');
  };

  BasePage.prototype.toggleMenu = function() {
    $('.profile-box > button').click();
  };

  BasePage.prototype.logout = function() {
    this.toggleMenu();

    element(by.buttonText('Log out')).click();
  };

  BasePage.prototype.selectMenuItem = function(item) {
    this.toggleMenu();

    $('header .dropdown').element(by.linkText(item)).click();
  };

  BasePage.prototype.clickLogIn = function() {
    this.loginLink().click();
  };

  BasePage.prototype.verifyUserEmailLinkPresent = function(email) {
    email         = email || this.defaultEmail;
    var emailLink = $('header').element(by.linkText(email));

    expect(emailLink.isPresent()).toBeTruthy();
  };

  BasePage.prototype.verifyLoginLinkPresence = function(isPresent) {
    expect(this.loginLink().isPresent()).toBe(isPresent);
  };


  /*
   * @param {WebElement} element - tooltip under test
   * @param {String} text - tooltip's text
   * @param {Boolean} displayed - shall the tooltip be displayed. Default - true.
   */
  BasePage.prototype.verifyTooltip = function(element, text, displayed) {
    if (typeof displayed === 'undefined') { displayed = true }

    element.getText().then(function(txt) {
      // replace all newline chars with whitespace
      expect(txt.replace(/\n/g, ' ')).toBe(text);
    });

    expect(element.isDisplayed()).toBe(displayed);
  };

  BasePage.prototype.verifyNotification = function(text) {
    var EC           = protractor.ExpectedConditions;
    var notification = this.notificationContainer();

    browser.wait(EC.presenceOf(notification), 5000);

    expect(notification.isPresent()).toBeTruthy();
    expect(notification.getText()).toBe(text);
  };

  module.exports = BasePage;
})();
