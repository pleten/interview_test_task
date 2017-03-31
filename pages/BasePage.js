(function(){
  'use strict';

  function BasePage(){ }

  BasePage.prototype.loginLink = element(by.tagName('header'))
    .element(by.css('a[ui-sref="authorize.index"]'));

  BasePage.prototype.clickLogIn = function(){
    this.loginLink.click();
  };

  BasePage.prototype.verifyUserEmailLinkPresent = function(email){
    var emailLink = element(by.tagName('header')).element(by.linkText(email));

    expect(emailLink.isPresent()).toBeTruthy();
  };

  BasePage.prototype.verifyLoginLinkNotPresent = function(email){
    expect(this.loginLink.isPresent()).toBeFalsy();
  };

  module.exports = BasePage;
})();
