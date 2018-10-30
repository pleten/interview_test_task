const homePage = require('../pages/home_page.js');


describe('Home', () => {
    let beforeFilterUsage;
    let afterPersonalFilterUsage;
    let afterPersonalAndMultiDomainFilterUsage;
    let afterCheapestFilterUsage;
    let afterFeaturedFilterUsage;

    it('Filters. TC-8-1', function(done) {
        console.log('Authorize with valid credentials');
        homePage.goToCerts();
        homePage.getVisibleCertsCount()
            .then(function(count) {
                beforeFilterUsage = count;
            });
        homePage.usePersonalFilter();
        homePage.getVisibleCertsCount()
            .then(function(count) {
                afterPersonalFilterUsage = count;
                expect(afterPersonalFilterUsage).toBeLessThan(beforeFilterUsage,
                "Certificate button text doesn`t match user email");
            });
        homePage.useMultiDomainFilter();
        homePage.getVisibleCertsCount()
            .then(function(count) {
                afterPersonalAndMultiDomainFilterUsage = count;
                expect(afterPersonalAndMultiDomainFilterUsage).toBeLessThan(afterPersonalFilterUsage,
                    "Certificate button text doesn`t match user email");
            });
        done();
    });

    it('Filters. TC-8-2', function(done) {
        console.log('Authorize with valid credentials');
        homePage.goToCerts();
        homePage.getLastCertPrice()
            .then(function(lastCertPrice) {
                beforeFilterUsage = parseInt(lastCertPrice);
            });
        homePage.useCheapestFilter();
        homePage.getLastCertPrice()
            .then(function(lastCertPrice) {
                afterCheapestFilterUsage = parseInt(lastCertPrice);
                expect(beforeFilterUsage).toBeLessThan(afterCheapestFilterUsage,
                    "Certificate button text doesn`t match user email");
            });
        homePage.useFeaturedFilter();
        homePage.getLastCertPrice()
            .then(function(lastCertPrice) {
                afterFeaturedFilterUsage = parseInt(lastCertPrice);
                expect(afterFeaturedFilterUsage).toEqual(beforeFilterUsage,
                    "Certificate button text doesn`t match user email");
            });
        done();
    });
});