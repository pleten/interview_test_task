const { When, Then } = require("cucumber");
const expect = require("chai").use(require("chai-as-promised")).expect;
import { onHomePage } from "../pagesObjects";

When(/^I select Personal filter on Home page$/, async () => {
    await onHomePage.applyPersonalFilter();
});

When(/^I select Business filter on Home page$/, async () => {
    await onHomePage.applyBusinessFilter();
});

When(/^I select One Domain filter on Home page$/, async () => {
    await onHomePage.applyOneDomainFilter();
});

When(/^I select Cheapest filter on Home page$/, async () => {
    await onHomePage.applyCheapestFilter();
});

Then(/^Only certificates with (.*?) characteristic should be displayed on Home page$/, async (attribute) => {
    const attributesLists: any[] = await onHomePage.getAttributesOfAllCertificates();
    expect(attributesLists.length > 0).to.be.true;
    for (const list of attributesLists) {
        expect(list).to.be.contains(attribute);
    }
});

Then(/^Filter title should be changed to (.*?) value$/, async (title) => {
    const buttonTitle: string = await onHomePage.getCheapestFeaturedButtonTitle();
    expect(buttonTitle.toLowerCase()).to.be.equal(title.toLowerCase());
});

Then(/^All certificated should be sorted by price in ASC order$/, async () => {
    const pricesList: number[] = await onHomePage.getAllCertificatesPrices();
    expect(pricesList.sort()).to.be.deep.equal(pricesList);
})