const chai = require('chai');
const assertArrays = require('chai-arrays');
chai.use(assertArrays);
chai.use(require("chai-sorted"));
const expect = chai.expect;
const allure = codeceptjs.container.plugins('allure');

Feature('Home page filters');

Before((I, homePage) => {
    I.amOnPage(homePage.url);
    I.waitForElement(homePage.filterRoot);

});

Scenario('List of SSL certificates after clicking on “Personal” filter should contain only product cards with “Domain Validation”', async (I, homePage) => {
    let needleText = 'Domain validation';
    homePage.clickOnFilterByNames([homePage.filterNames.personal]);
    let descriptions = await homePage.grabCertDescription();
    expect(descriptions).to.be.array().that.is.not.empty;
    for (let item of descriptions) {
        let message = 'Element with index: ' + descriptions.indexOf(item);
        expect(item).to.include(needleText, msg = message);
    }
});

Scenario('List of SSL certificates after clicking on “Business” and “One domain” filters should contain product cards with “Organization Validation” and “1 domain”', async (I, homePage) => {
    let needleText = 'Organization validation';
    let domainNeedleText = '1 domain';

    homePage.clickOnFilterByNames([homePage.filterNames.business, homePage.filterNames.oneDomain]);
    let descriptions = await homePage.grabCertDescription();
    expect(descriptions).to.be.array().that.is.not.empty;
    for (let item of descriptions) {
        let message = 'Element with index: ' + descriptions.indexOf(item);
        // jus example how to add custom assertions to report
        allure.createStep(`Expect item include ${needleText} text`);
        expect(item).to.include(needleText, msg = message);
        allure.createStep(`Expect item include ${domainNeedleText} text`);
        expect(item).to.include(domainNeedleText, msg = message);
    }
});

Scenario('Possible to remove filter', async (I, homePage) => {
    homePage.clickOnFilterByNames([homePage.filterNames.business, homePage.filterNames.oneDomain]);
    let itemsBefore = await I.grabNumberOfVisibleElements(locate(homePage.certListRoot).find(homePage.certItemDescription));
    homePage.clickOnFilterByNames([homePage.filterNames.business, homePage.filterNames.oneDomain], true);
    let itemsAfter = await I.grabNumberOfVisibleElements(locate(homePage.certListRoot).find(homePage.certItemDescription));
    expect(itemsBefore).to.be.below(itemsAfter);
});

Scenario('List of SSL certificates after clicking on “Cheapest/Featured” filter should be sorted by price ascending', async (I, homePage) => {
    let numOfCert = await I.grabNumberOfVisibleElements(homePage.certItemDescription);
    I.waitForElement(locate(homePage.sortButton).withText('Cheapest'));
    I.click(homePage.sortButton);
    I.waitForElement(locate(homePage.sortButton).withText('Featured'));
    let prices = await homePage.grabCertPrices();
    allure.createStep(`Expect we get more than one price value`);
    expect(prices).to.be.array();
    allure.createStep(`Expect number of price value the same as number of certificates`);
    expect(prices).to.be.ofSize(numOfCert);
    let result = prices.map((x) => {
        return parseInt(x);
    });
    //Assert sorted by price ascending
    expect(result).to.be.sorted({ascending: true});
});
