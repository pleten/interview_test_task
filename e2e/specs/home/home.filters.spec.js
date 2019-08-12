"use strict";

const headerPage = requirePO("layout/header"),
    homePage = requirePO("home/home");

// Data provider
let filters = [
    {
        name: "'Personal' filter ",
        filter: "Personal",
        card: "Domain validation"
    },
    {
        name: "'Business' and 'One domain' filters ",
        filter: "Business",
        filterTwo: "one domain",
        card: "Organization validation",
        cardTwo: "1 domain"
    }
];

describe("Home page. Filters", function () {
    beforeAll(function () {
        browser.get("/");
        headerPage.certsLink.click();
    });

    afterAll(function () {
        helpers.logOut();
    });

    using(filters, function (filters) {
        describe(filters.name, function () {
            afterAll(function () {
                helpers.unselectFilters();
            });

            it("should show the appropriate filtered results", async function () {
                await browser.wait(EC.elementToBeClickable(homePage.filterByName(filters.filter)), 30000, "Cert name is not clicable.");
                await homePage.filterByName(filters.filter).click();
                if (filters.filterTwo) {
                    await homePage.filterByName(filters.filterTwo).click();
                }
                // check that each card in the results has the filtered value
                await helpers.filterByCardname(filters.card);
                if (filters.cardTwo) {
                    await helpers.filterByCardname(filters.cardTwo);
                }
            });
        });
    });
});
