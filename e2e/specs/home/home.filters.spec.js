"use strict";

const headerPage = requirePO("layout/header"),
    homePage = requirePO("home/home");

// Data provider
let filters = [
    {
        name: "'Personal' filter ",
        filterName: "Personal",
        card: "Domain validation"
    },
    {
        name: "'Business' and 'One domain' filters ",
        filterName: "Business",
        filterNameTwo: "one domain",
        card: "Organization validation",
        cardTwo: "1 domain"
    }
];

describe("Home page. Filters", function () {
    beforeAll(function () {
        browser.get("/");
        headerPage.certsLink.click();
    });

    using(filters, function (filter) {
        describe(filter.name, function () {
            afterAll(function () {
                helpers.unselectFilters();
            });

            it("should show the filtered results", async function () {
                await browser.wait(EC.elementToBeClickable(homePage.filterByName(filter.filterName)), 30000, "Cert name is not clicable.");
                await homePage.filterByName(filter.filterName).click();
                if (filter.filterNameTwo) {
                    await homePage.filterByName(filter.filterNameTwo).click();
                }
                // check that each card in the results has the filtered value
                await helpers.filterByCardname(filter.card);
                if (filter.cardTwo) {
                    await helpers.filterByCardname(filter.cardTwo);
                }
            });
        });
    });
});
