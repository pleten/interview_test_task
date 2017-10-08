'use strict';

var BasePage = function() {
    this.drdUsername = element(by.css('.dropdown-btn'));
    this.btnLogout = element(by.css('button[ng-click="logout()"]'));
    this.btnViewProfile = element(by.cssContainingText('.drop-link', 'View profile'));

    this.logout = function() {
        this.drdUsername.click();
        this.btnLogout.click();
    };

    this.viewProfile = function() {
        this.drdUsername.click();
        this.btnViewProfile.click();
    };
};

module.exports = BasePage;