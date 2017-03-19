var testData = require('../Data/TestConstants');
var locators = require('../Data/Locators');

var ProfilePage = function() {
// elements
var nameField = element(by.css(locators.ProfilePage.NAME_FIELD));
var emailField = element(by.css(locators.ProfilePage.EMAIL_FIELD));
var phoneField = element(by.css(locators.ProfilePage.PHONE_FIELD));
var addressField = element(by.css(locators.ProfilePage.ADDRESS_FIELD));
var pinField = element(by.css(locators.ProfilePage.SUPPORT_PIN_FIELD));
var newsletterField = element(by.css(locators.ProfilePage.NEWSLETTER_FIELD));
var pinRefreshButton = element(by.css(locators.ProfilePage.SUPPORT_PIN_REFRESH));

// methods
this.clickRefreshPin = function() {
   this.getPinRefreshButton().click();
    };

this.getNameField = function() {
            return nameField;
    };

this.getEmailField = function() {
            return emailField;
    };

this.getPhoneField = function() {
            return phoneField;
    };

this.getAddressField = function() {
            return addressField;
    };

this.getPinField = function() {
            return pinField;
    };

this.getNewsletterField = function() {
            return newsletterField;
    };

this.getPinRefreshButton = function() {
            return pinRefreshButton;
    };
};

module.exports = new ProfilePage();