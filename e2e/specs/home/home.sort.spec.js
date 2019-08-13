"use strict";

const headerPage = requirePO("layout/header"),
    homePage = requirePO("home/home");

describe("Home page. Sorting", function () {
    beforeAll(function () {
        browser.get("/");
        headerPage.certsLink.click();
    });

    it("should show the 'FEATURED' button with the 'down' icon after clicking the 'CHEPEAST' button", function () {
        browser.wait(EC.elementToBeClickable(homePage.cheeapestSortBtn), 30000, "Sort button is not clicable.");
        homePage.cheeapestSortBtn.click();
        
        expect(homePage.cheeapestSortBtn.isPresent()).toEqual(false);
        expect(homePage.cheeapestSortIcon.isPresent()).toEqual(false);

        expect(homePage.featuredSortBtn.isDisplayed()).toEqual(true);
        expect(homePage.featuredSortBtn.isEnabled()).toEqual(true);

        expect(homePage.featuredSortIcon.isDisplayed()).toEqual(true);
    });

    // eslint-disable-next-line jasmine/missing-expect
    it("should show the filtered results sorted from the chepeast to the most expensive after clicking the 'CHEPEAST' button", function () {
        helpers.sortedByPrice();
    });
});
