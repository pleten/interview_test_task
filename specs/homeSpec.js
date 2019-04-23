import HomePage from '../pages/homePage';

describe('Tests for Filters on the \'Home\' page', function() {

    beforeEach(function() {
        HomePage.open();
      });

    it('Test: \'Personal\' filter', function() {
        HomePage.titleIs(HomePage.title);
        HomePage.btnPresonalFilter.click();
        var elements = HomePage.allProductCards;
        elements.count().then(function(value) {
            for(var i = 0; i < value; i++ ){
                var el = elements.get(i).$('div.ssl-content div.desc-box');
                expect(el.getText()).toContain('Domain validation');
            }
          }); 
        HomePage.btnPresonalFilter.click();
    });

    it('Test: \'Business\' and \'One domain\' filters', function() {
        HomePage.titleIs(HomePage.title);
        HomePage.btnBusinessFilter.click();
        HomePage.btnOneDomainFilter.click();
        var elements = HomePage.allProductCards;
        elements.count().then(function(value) {
            for(var i = 0; i < value; i++ ){
                var el = elements.get(i).$('div.ssl-content div.desc-box');
                expect(el.getText()).toContain('1 domain');
                expect(el.getText()).toContain('Organization validation');
            }
          }); 
        HomePage.btnBusinessFilter.click();
        HomePage.btnOneDomainFilter.click();
    });

    it('Test: \'Cheapest\' sorting', function() {
        HomePage.titleIs(HomePage.title);
        expect(HomePage.btnSortCheapestFeatured.getText()).toContain('CHEAPEST');
        var ascSortedPrices = HomePage.getAscSortedPrices();
        HomePage.isClickable(HomePage.btnSortCheapestFeatured);
        HomePage.btnSortCheapestFeatured.click();
        expect(HomePage.btnSortCheapestFeatured.getText()).toContain('FEATURED');
        var pricesAfterSorting = HomePage.getPrices();
        expect(pricesAfterSorting).toEqual(ascSortedPrices);
    });

    afterEach(function() {
        HomePage.clearBrowserStorage();
      });

  });