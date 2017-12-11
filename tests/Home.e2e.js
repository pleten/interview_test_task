let data = require('../resources/TestData.json');
let pHome = require('../pages/Home.js');
let pAuth = require('../pages/Auth.js');
let assert = require('assert');

Feature('Home');

Scenario('Test main page - check filter "Personal" is working correctly: "8. Filters"', function*(I) {
    I.amOnPage(pHome.url);

    let locator = pHome.getCertificatesAssuranceDescriptionContext();
    let needleValue = 'Low assurance';

    I.click(pHome.locators.filters.ftrPersonal);
    let resultArray = yield I.grabTextFrom(locator);

    Object.keys(resultArray).forEach((key) => {
        assert.equal(resultArray[key], needleValue);
    });
});

Scenario('Test main page - check filter "Multi-domain" is working correctly: "8. Filters"', function*(I) {
    I.amOnPage(pHome.url);

    let locator = pHome.getCertificatesDomainDescriptionContext();
    let needleValue = '3-100 domains';

    I.click(pHome.locators.filters.ftrMultiDomain);
    let resultArray = yield I.grabTextFrom(locator);

    Object.keys(resultArray).forEach((key) => {
        assert.equal(resultArray[key], needleValue);
    });
});

Scenario('Test main page - check sorting by "Cheapest" is working correctly: "8. Filters"', function*(I) {
    I.amOnPage(pHome.url);

    let locator = pHome.getCertificatesPriceContext();

    I.click(pHome.locators.sortBy.optCheapest);
    let resultArray = yield I.grabValueFrom(locator);

    assert.equal(resultArray[0] > resultArray[1], true);
});

Scenario('Test main page - check sorting by "Featured" is working correctly: "8. Filters"', function*(I) {
    I.amOnPage(pHome.url);

    let locator = pHome.getCertificatesRatingContext();

    I.click(pHome.locators.sortBy.optCheapest);
    I.click(pHome.locators.sortBy.optFeatured);
    let resultArray = yield I.grabAttributeFrom(locator, 'class');

    assert.equal(resultArray[0] > resultArray[resultArray.length - 1], true);
});

