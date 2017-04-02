(function() {
  'use strict';

  var BasePage = require('./BasePage');

  HomePage.prototype.__proto__   = BasePage.prototype;
  HomePage.prototype.constructor = HomePage;

  function HomePage() {
    this.URL              = '/';
    this.title            = 'SSL Certificates. Buy Cheap SSL Certs from $4.99/yr';
    this.certificatesList = function() {
      return $('.cert-list')
    }
  }

  HomePage.prototype.clickFilter = function(filter) {
      filter = browser.browserName === 'chrome' ? filter.toUpperCase() : filter ;

      $('.filter-box').element(by.linkText(filter)).click()
  };

  HomePage.prototype.clickSort = function() {
    $('.sort-btn a').click()
  };

  HomePage.prototype.verifyFilteredSslNames = function(names) {
    expect(this.certificatesList().all(by.binding('product.name')).getText())
      .toEqual(names);
  };

  HomePage.prototype.verifySortedSslPrices = function(prices) {
    expect(this.certificatesList().$$('price').getAttribute('value'))
      .toEqual(prices);
  };


  module.exports = new HomePage();
})();
