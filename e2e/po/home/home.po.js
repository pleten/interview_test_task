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
    this.cheeapestSortBtn = element(by.xpath("//a[contains(text(), 'Cheapes')]"));
    // eslint-disable-next-line protractor/valid-locator-type
    this.cheeapestSortIcon = this.cheeapestSortBtn.element('.icon-sort-alt-up');
};

module.exports = new HomePage();
