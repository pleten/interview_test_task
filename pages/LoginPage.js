(function(){
  'use strict';

  var BasePage = require('./BasePage');

  function LoginPage(){
    this.title              = "Sign In | SSLs.com";
    this.email_field        = element(by.model('form.email'));
    this.login_button       = element(by.buttonText('Login'));
    this.passord_field      = element(by.model('form.password'));
    this.show_password_icon = element(by.className('icon-eye'));
  }

  LoginPage.prototype.__proto__   = BasePage.prototype;
  LoginPage.prototype.constructor = LoginPage;

  LoginPage.prototype.set_email = function(email){
    this.email_field.sendKeys(email);
  };

  LoginPage.prototype.set_password = function(password){
    this.passord_field.sendKeys(password);
  };

  LoginPage.prototype.show_password = function(){
    this.show_password_icon.click();
  };

  LoginPage.prototype.click_login_button = function(){
    this.login_button.click();
  };

  LoginPage.prototype.verify_password_visible = function(){
    expect(this.passord_field.getAttribute('type')).toEqual('text');
  };

  LoginPage.prototype.verifyTitle = function(){
    expect(browser.getTitle()).toEqual(this.title);
  };

  LoginPage.prototype.verifyUrl = function(){
    browser.getCurrentUrl().then(function(url){
      expect(url).toEqual(browser.baseUrl + '/authorize')
    });
  };

  module.exports = new LoginPage();
})();
