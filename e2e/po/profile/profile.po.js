/* eslint-disable protractor/no-by-xpath */
"use strict";

const ProfilePage = function () {
    this.url = "/user/profile";
    this.profileForm = element(by.css('.panel'));
    this.pageTitle = element(by.css('.page-title'));

    this.updateSupportPinIcon = element(by.css('button[name=supportPin]'));
    this.supportPinValue = element(by.css('form .item:nth-child(6) .description span.text'));
    
    this.wait = function() {
        browser.wait(EC.visibilityOf(this.pageTitle), 30000, "Page title is not visible.");
    };
};

module.exports = new ProfilePage();
