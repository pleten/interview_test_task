var AuthorizationPage = require('../page-objects/authorization.page'),
    HomePage = require('../page-objects/home.page'),
    Profile = require('../page-objects/profile.page');

describe('My Profile -', function() {
    var home = new HomePage();
    var data = browser.params.data;

    beforeEach(function() {
        home.go();
    });

    // I was not able to complete test for sorting by price and rating due to discrepancies
    // between data obtained from the website and generated test data. More info can be
    // provided. I have captured all necessary data(screenshots) to prove my point.
    it('Filters', function() {
        expect(home.sortBtn.getText()).toContain("CHEAPEST");
        //home.verifySortingBy("rating", true);
        //browser.executeScript('arguments[0].scrollIntoView()', home.sortBtn.getWebElement());
        //home.sortBtn.click();
        //home.verifySortingBy("price", false);
        home.filterItemsBy("PERSONAL");
        expect(home.verifyFilteringBy({isPersonal: true})).toBeTruthy();
        home.filterItemsBy("MULTI-DOMAIN");
        expect(home.verifyFilteringBy({isPersonal: true, isMultiDomain: true})).toBeTruthy();
    });
});
