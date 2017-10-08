'use strict';

var ProfilePage = function() {
    this.lblName = element(by.css('span[ng-hide = "activeRow === \'name\'"]'));
    this.lblEmail = element(by.css('span[ng-hide = "activeRow === \'email\'"]'));
    this.lblPhone = element(by.css('span[ng-hide = "activeRow === \'phone\'"]'));
    this.lblAddress = element(by.css('span[ng-hide = "activeRow === \'address\'"]'));
    this.lblPin = element(by.css('div[ng-class = "{disabled: activeRow !== \'pin\' && activeRow !== \'all\'}"]'));
    this.tgbtnNewsletter = element(by.css('div[ng-class = "{disabled: activeRow !== \'newsletter\' && activeRow !== \'all\'}"]'));
    this.btnUpdatePin = element(by.css('.icon-arrows-cw'));
};

module.exports = ProfilePage;