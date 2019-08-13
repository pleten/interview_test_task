"use strict";

const HomePage = function () {
    this.promoBanner = element(by.css(".ev-promo-banner"));

    this.wait = function() {
        browser.wait(EC.visibilityOf(this.promoBanner), 30000, "Promo banner is not visible.");
    };

    this.filterByName = function(filter) { 
        // eslint-disable-next-line protractor/no-by-xpath
        return element(by.xpath("//a[contains(text(), '" + filter + "')]"));
    };

    // eslint-disable-next-line protractor/no-by-xpath
    this.cheeapestSortBtn = element(by.xpath("//span[contains(@class, 'icon-sort-alt-up')]//.."));
    // eslint-disable-next-line protractor/valid-locator-type
    this.cheeapestSortIcon = element(by.css('.icon-sort-alt-up'));

    // eslint-disable-next-line protractor/no-by-xpath
    this.featuredSortBtn = element(by.xpath("//span[contains(@class, 'icon-sort-alt-down')]//.."));
    // eslint-disable-next-line protractor/valid-locator-type
    this.featuredSortIcon = element(by.css('.icon-sort-alt-down'));
};

module.exports = new HomePage();
