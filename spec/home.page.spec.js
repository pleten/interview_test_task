(function() {
  'use strict';

  var homePage;
  var testData = require('./data/test.data');

  describe('Home page.', function() {
    beforeEach(function() {
      browser.getCapabilities().then(function(caps) {
        browser.browserName = caps.get('browserName');
      });
    });

    beforeEach(function() {
      homePage = require('../pages/HomePage');
    });

    beforeEach(function() {
      // 1. Open Home paget
      homePage.visit();
    });

    it('Filters', function() {


      // 2. Click on "Personal" filter button
      homePage.clickFilter('Personal');

      //Verify list of SSL certificates after clicking on “Personal” filter -
      // check that ONLY expected ssl certificates displayed after applying of
      // “Personal” filter;
      homePage.verifyFilteredSslNames(testData.sslNames.personal);

      // 3. Click on "Multi-Domain” filter butto
      homePage.clickFilter('multi-domain');

      //Verify list of SSL certificates after clicking on “Personal” +
      // “Multi-Domain” filter - check that ONLY expected ssl certificates
      // displayed after applying of “Personal” + “Multi-Domain” filters;
      homePage.verifyFilteredSslNames(testData.sslNames.personalMultiDomain);

      // FIXME: Remove filters to verify default sorting. Not mentions in steps.
      homePage.clickFilter('multi-domain');
      homePage.clickFilter('Personal');

      // Verify that SSL certificates sorted by "Featured" by default
      // - check order of ssl certificates;
      homePage.verifyFilteredSslNames(testData.sslNames.featured);

      // 4.Click on “Cheapest/Featured” filter button
      homePage.clickSort();

      //Verify that SSL certificates sorted by "Cheapest" after clicked
      // "Cheapest" button - check order of ssl certificates.
      homePage.verifyFilteredSslNames(testData.sslNames.cheapest);
      homePage.verifySortedSslPrices(testData.sslPrices.cheapest);
    });
  });
})();
