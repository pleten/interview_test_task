"use strict";

const HomePage = function () {
    this.promoBanner = element(by.css(".ev-promo-banner"));

    this.wait = function() {
        browser.wait(EC.visibilityOf(this.promoBanner), 30000, "Promo banner is not visible.");
    };

    this.filterByName = function(filter) { 
        return element(by.xpath("//a[contains(text(), '" + filter + "')]"));
    };

    this.cheeapestSortBtn = element(by.xpath("//a[contains(text(), 'Cheapes')]"));
    this.cheeapestSortIcon = this.cheeapestSortBtn.element('.icon-sort-alt-up');

    
    
    
};

module.exports = new HomePage();
