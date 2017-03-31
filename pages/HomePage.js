(function(){
  'use strict';

  var BasePage = require('./BasePage');

  function HomePage(){
    this.title = 'SSL Certificates. Buy Cheap SSL Certs from $4.99/yr';
  }

  HomePage.prototype.__proto__   = BasePage.prototype;
  HomePage.prototype.constructor = HomePage;

  HomePage.prototype.verifyTitle = function(){
    expect(browser.getTitle()).toEqual(this.title);
  };

  HomePage.prototype.verifyUrl = function(){
    browser.getCurrentUrl().then(function(url){
      expect(url).toEqual(browser.baseUrl + '/')
    });
  };

  module.exports = new HomePage();
})();
