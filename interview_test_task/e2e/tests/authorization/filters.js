const mainPage = require("../../pages/mainPage.js");

describe('​Home page. Filters', function () {

    beforeAll(function () {
        mainPage.openHomePage();
    });

    it('applying of “Personal” filter', function () {
        mainPage.clickFilterBtn("Personal");
        expect(mainPage.getCertCount()).toEqual(5);
        expect(mainPage.getCertTitle()).toEqual([
            'PositiveSSL',
            'EssentialSSL',
            'PositiveSSL Wildcard',
            'PositiveSSL Multi-Domain',
            'EssentialSSL Wildcard' ]);
    });

    it('SSL certificates sorted by "Cheapest"', function () {
        mainPage.clickSortFilter();
        expect(mainPage.getPrice()).toEqual([ '$5.88/YR', '$14.88/YR', '$28.99/YR', '$72.88/YR', '$74.88/YR' ]);
    });

    it(' SSL certificates sorted by "Featured"', function () {
        mainPage.clickSortFilter();
        expect(mainPage.getReitingStars()).toEqual([
            'rating stars-5_0',
            'rating stars-5_0',
            'rating stars-5_0',
            'rating stars-5_0',
            'rating stars-4_0' ]);
    });

    it('applying of “Personal” + “Multi-Domain” filters', function () {
        mainPage.clickFilterBtn("multi-domain");
        expect(mainPage.getCertCount()).toEqual(1);
        expect(mainPage.getCertTitle()).toEqual([ 'PositiveSSL Multi-Domain' ]);
    });
});