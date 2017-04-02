(function() {
  'use strict';

  var BasePage = require('./BasePage');

  LoginPage.prototype.__proto__   = BasePage.prototype;
  LoginPage.prototype.constructor = LoginPage;

  function LoginPage() {
    this.URL              = '/authorize';
    this.title            = "Sign In | SSLs.com";
    this.loginBtn         = function() {return element(by.buttonText('Login'))};
    this.emailField       = function() {return element(by.model('form.email'))};
    this.passwordField    = function() {return element(by.model('form.password'))};
    this.showPasswordIcon = function() {return $('.icon-eye')};

    this.invalidEmailTooltip = function() {
      return $('.form-group.email div.left-tooltip-box:nth-of-type(1)');
    };

    this.emptyEmailTooltip = function() {
      return $('.form-group.email div.left-tooltip-box:nth-of-type(2)');
    };

    this.emptyPasswordTooltip = function() {
      return $('form[name="authForm"] .input-group .tooltip-text');
    };
  }

  LoginPage.prototype.setEmail = function(email) {
    email = email || this.defaultEmail;

    this.emailField().sendKeys(email);
  };

  LoginPage.prototype.setPassword = function(password) {
    password = password || this.defaultPassword;

    this.passwordField().sendKeys(password);
  };

  LoginPage.prototype.showPassword = function() {
    this.showPasswordIcon().click();
  };

  LoginPage.prototype.clickLoginButton = function() {
    this.loginBtn().click();
  };

  LoginPage.prototype.login = function(email, password) {
    this.visit();
    this.setEmail(email);
    this.setPassword(password);
    this.clickLoginButton();
  };

  LoginPage.prototype.verifyPasswordVisible = function(password) {
    password           = password || this.defaultPassword;
    var password_field = this.passwordField();

    expect(password_field.getAttribute('type')).toEqual('text');
    expect(password_field.getAttribute('value')).toEqual(password);
  };

  LoginPage.prototype.verifyInvalidEmailTooltip = function(text) {
    this.verifyTooltip(this.invalidEmailTooltip(), text);
  };

  LoginPage.prototype.verifyEmptyEmailTooltip = function(text) {
    this.verifyTooltip(this.emptyEmailTooltip(), text);
  };

  LoginPage.prototype.verifyEmptyPasswordTooltip = function(text) {
    this.verifyTooltip(this.emptyPasswordTooltip(), text);
  };

  module.exports = new LoginPage();
})();
