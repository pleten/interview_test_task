let HomePage = require('../pages/homePage.js');
let isEqual = require('lodash.isequal');


describe('Protractor Demo App', function() {

    beforeEach(() => {
        HomePage.get();
    });

    it('Home page. Filters', async () => {

        HomePage.selectPersonalSSL();
        element.all(by.css('div.ssl-item p:nth-of-type(4)')).then(function(items) {
            for (let i = 0; i < items.length; i++){
                expect(items[i].getText()).toBe('Domain validation');
            }
        });

        HomePage.selectMultiDomainSSL();
        element.all(by.css('div.ssl-item p:nth-of-type(4)')).then(function(items) {
            for (let i = 0; i < items.length; i++){
                expect(items[i].getText()).toBe('Domain validation');
            }
        });
        element.all(by.css('div.ssl-item p:nth-of-type(2)')).then(function(items) {
            for (let i = 0; i < items.length; i++){
                expect(items[i].getText()).toBe('3-100 domains');
            }
        });

        HomePage.selectPersonalSSL();
        HomePage.selectMultiDomainSSL();
        let defaultOrdering = await HomePage.getPrices();
        HomePage.applyCheapestSorting();
        let cheapestOrdering = await HomePage.getPrices();
        let sortedArray = cheapestOrdering.slice().sort((a, b) => a - b);
        expect(isEqual(cheapestOrdering, sortedArray)).toEqual(true);

        HomePage.applyFeaturedSorting();
        let featuredOrdering = await HomePage.getPrices();
        expect(isEqual(defaultOrdering, featuredOrdering)).toEqual(true);
    });

});