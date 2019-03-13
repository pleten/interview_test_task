var Home = require('../pages/homePage');
var testData = require('../testData');

describe('Home page', function () {

    var homePage;

    beforeEach(async function () {
        homePage = await new Home();
        await browser.get(testData.url);
    });

    it('Filters', async function () {
        var expCheapestPrices = [5.88,12.88,19.66,70.88,72.88]
        var expFeaturedItems = ["EssentialSSL", "PositiveSSL Wildcard", "EssentialSSL Wildcard", "PositiveSSL Multi-Domain", "PositiveSSL"]
        var expPersonalandMultiDomainItem = ["PositiveSSL Multi-Domain"]

        await homePage.clickCheapestFilter();
        await homePage.clickPersonalFilter();
        expect(expCheapestPrices).toEqual(await homePage.getPrices());
        await homePage.clickFeaturedFilter();
        expect(expFeaturedItems).toEqual(await homePage.getNames());
        await homePage.clickMultiDomainFilter();
        expect(expPersonalandMultiDomainItem).toEqual(await homePage.getNames());
    });

});