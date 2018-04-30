const pageObject = require('./../../services/pages').container.PageObject;
const homePage = pageObject.getHomePage();
const data = require('../../data/index.js');

describe('FILTERING TESTS', function () {

    const homepageUrl = data.url.homePageUrl;

    describe('checking FILTERS on HOME PAGE', function () {

        it('should open HOME page', function () {
            browser.get(browser.baseUrl);
            expect(browser.getCurrentUrl()).toEqual(homepageUrl);
        });

        it('should FILTER by PERSONAL', function () {
            homePage.clickPersonalFilter();
            expect(homePage.isOnlyPersonalDisplayed()).toBeTruthy();
        });

        it('should FILTER by MULTi-DOMAIN', function () {
            homePage.clickMultiDomainFilter('multi-domain');

            expect(homePage.isOnlyPersonalDisplayed()).toBeTruthy();
            expect(homePage.isOnlyMultiDomainDisplayed()).toBeTruthy();
        });

        it('should ORDER by FEATURED', async function () {
            await expect((homePage.btnOrderByCheapest).isDisplayed()).toBeTruthy();

            await homePage.clickPersonalFilter();
            await homePage.clickMultiDomainFilter('multi-domain');
            await browser.sleep(1000);
            await homePage.getRatingsAndSort();

            await expect(homePage.isSortedByRating()).toBeTruthy();
        });

        it('should ORDER by CHEAPEST', async function () {
            await homePage.getPricesAndSort();
            await homePage.sortByCheapest();
            await browser.sleep(1000);

            await expect(homePage.isSortedByPrice()).toBeTruthy();
        });
    });
});
