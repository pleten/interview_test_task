/*Steps:
1. Open Home page
2. Click on "Personal" filter button
3. Click on "Multi-Domain” filter button
4. Click on “Cheapest/Featured” filter button
Expected Result:
1. After selected of filters, products sorted depending on filter(s):
1.1. Verify list of SSL certificates after clicking on “Personal” filter;
1.2. Verify list of SSL certificates after clicking on “Personal” + “Multi-Domain” filter;
1.3. Verify that SSL certificates sorted by "Featured" by default;
1.4. Verify that SSL certificates sorted by "Cheapest" after clicked "Cheapest" button;
1.5. Verify that SSL certificates sorted by "Featured" after clicked "Featured" button.*/

var testData = require('../Data/TestConstants.js');
var homePage = require('../Pages/HomePage.js');
var loginPage = require('../Pages/LoginPage.js');
var locators = require('../Data/Locators');

describe('Test Authorization page', function() {
	it('Test Authorization page', function() {
	// 1. navigate to home page
    homePage.navigateToURL();

    //4. verifying "Cheapest/featured" filter
    homePage.getCheapestFeaturedFilter().getText().then(function(cheapestFilterText){
    console.log('Cheapest/Featured filter default text = ' + cheapestFilterText);
    expect(cheapestFilterText).toEqual(testData.Constants.CHEAPEST_FEATURED_DEFAULT_TEXT,"Filter is not set to Featured by default")
    });
    browser.sleep(testData.Timeout.SHORT_WAIT_MILI);
    homePage.getFirstItemPrice().getAttribute("value").then(function(firstItemPriceBeforeFilter){
    console.log('First item price before filter = ' + firstItemPriceBeforeFilter);
    homePage.clickCheapestFeaturedFilter();
    browser.sleep(testData.Timeout.SHORT_WAIT_MILI);
    homePage.getFirstItemPrice().getAttribute("value").then(function(firstItemPriceAfterFilter){
    console.log('First item price after filter = ' + firstItemPriceAfterFilter);
    expect(firstItemPriceAfterFilter).toBeLessThan(firstItemPriceBeforeFilter,"Price after filter applied should be less");
    });
    });


    //2.3. verifying element count with filters
            homePage.countSslElements().then(function(resultBeforeFilters) {
        	console.log('Ssl elements count before filters = ' + resultBeforeFilters);
        	console.log('Clicking personal filter...');
        	homePage.clickPersonalFilter();
        	browser.sleep(testData.Timeout.SHORT_WAIT_MILI);
        	homePage.countSslElements().then(function(resultPersonalFilter) {
                    	console.log('Ssl elements count with personal filter = ' + resultPersonalFilter);
                    	expect(resultPersonalFilter).toBeLessThan(resultBeforeFilters,"Result count after filter applied should be less");
                    	console.log('Clicking multidomain filter...');
                    	homePage.clickMultidomainFilter();
                        browser.sleep(testData.Timeout.SHORT_WAIT_MILI);
                    	homePage.countSslElements().then(function(resultMultidomainFilter) {
                                            	console.log('Ssl elements count with personal+multidomain filter = ' + resultMultidomainFilter);
                                            	expect(resultMultidomainFilter).toBeLessThan(resultPersonalFilter,"Result count after filter applied should be less");
                                            	});
                    	});
         });
      });
  });