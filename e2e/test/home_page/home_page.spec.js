let commonHelper            = require('./../../services/helpers/common.helper.js');
let homePage                = require('./../../services/home_page/home_page.po.js');
let homeData                = require('./../../data/home_page/index.js');

describe('Home page scenarios', function () {

    let homePageUrl = homeData.url;

    describe('Home page. Filters', function () {

        let allNotNeededCertificates = [];
        let allNeededCertificates = [];
        let featuredSorted = [];
        let tempSorted = [];

        afterAll(function () {
            commonHelper.clearAllData();
        });

        it('should redirect to home page', function () {
            browser.get(homePageUrl);
        });

        it('should see limited time offer text', function () {
            commonHelper.waitUntilTextInElement(homePage.textLimited, homeData.limited_title);
            commonHelper.waitUntilElementVisible(homePage.filterItem(homeData.ssl_filters.cheapest));
        });

        it('should save featured sorted certificates', function () {
            featuredSorted = homePage.getAllCertificates();
        });

        it('should click cheapest sorting', function () {
            homePage.clickFilterItem(homeData.ssl_filters.cheapest);
            commonHelper.waitUntilElementVisible(homePage.filterItem(homeData.ssl_filters.featured));
        });

        it('should see certificates sorted by cheapest', function () {
            homePage.checkSortedByPrice();
        });

        it('should click featured sorting', function () {
            homePage.clickFilterItem(homeData.ssl_filters.featured);
            commonHelper.waitUntilElementVisible(homePage.filterItem(homeData.ssl_filters.cheapest));
        });

        it('should save featured sorted', function () {
            tempSorted = homePage.getAllCertificates();
        });

        it('should see certificates sorted by featured', function () {
            for(let i = 0; i < featuredSorted.length; i++){
                expect(tempSorted[i]).toEqual(featuredSorted[i]);
            }
        });

        it('should get all personal ssl certificates', function () {
            allNeededCertificates = homePage.getAllNeededCertificates(homeData.domain_validation);
        });

        it('should get all not needed certificates', function () {
            allNotNeededCertificates = homePage.getAllNotNeededCertificates(allNeededCertificates);
        });

        it('should click personal certificates', function () {
            homePage.clickFilterItem(homeData.ssl_filters.personal);
        });

        it('should not see not needed certificates', function () {
            allNotNeededCertificates.forEach(function (name) {
                commonHelper.waitUntilElementIsNotPresent(homePage.certificateByName(name));
            });
        });

        it('should see all personal certificates', function () {
            allNeededCertificates.forEach(function (name) {
                commonHelper.waitUntilElementVisible(homePage.certificateByName(name));
            });
        });

        it('should get all personal and multi-domain certificates', function () {
            allNeededCertificates = homePage.getAllNeededCertificates(homeData.multi_domains);
        });

        it('should get all other certificates', function () {
            allNotNeededCertificates = homePage.getAllNotNeededCertificates(allNeededCertificates);
        });

        it('should click multi-domain certificates', function () {
            homePage.clickFilterItem(homeData.ssl_filters.multi_domain);
        });

        it('should not see not needed certificates', function () {
            allNotNeededCertificates.forEach(function (name) {
                commonHelper.waitUntilElementIsNotPresent(homePage.certificateByName(name));
            });
        });

        it('should see only personal + multi-domain certificates', function () {
            allNeededCertificates.forEach(function (name) {
                commonHelper.waitUntilElementVisible(homePage.certificateByName(name));
            });
        });

        it('should save featured sorted certificates', function () {
            featuredSorted = homePage.getAllCertificates();
        });

        it('should click cheapest sorting', function () {
            homePage.clickFilterItem(homeData.ssl_filters.cheapest);
            commonHelper.waitUntilElementVisible(homePage.filterItem(homeData.ssl_filters.featured));
        });

        it('should see certificates sorted by cheapest', function () {
            homePage.checkSortedByPrice();
        });

        it('should click featured sorting', function () {
            homePage.clickFilterItem(homeData.ssl_filters.featured);
            commonHelper.waitUntilElementVisible(homePage.filterItem(homeData.ssl_filters.cheapest));
        });

        it('should save featured sorted', function () {
            tempSorted = homePage.getAllCertificates();
        });

        it('should see certificates sorted by featured', function () {
            for(let i = 0; i < featuredSorted.length; i++){
                expect(tempSorted[i]).toEqual(featuredSorted[i]);
            }
        });
    });
});