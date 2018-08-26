let commonHelper = require('./../helpers/common.helper.js');

let UserProfilePage = function() {

    //--------------------------------------------------------------------------
    // Elements
    //--------------------------------------------------------------------------

    this.toggleNewsletter = $('[ng-class*="newsletter"] button');

    this.buttonUpdateSupportPin = element(by.model('user.supportPin'));

    //--------------------------------------------------------------------------
    // Functions
    //--------------------------------------------------------------------------

    this.getProfileRowValue = function (rowName) {
        let element = $('[ng-class*="' + rowName + '"] .text.ng-binding');
        commonHelper.waitUntilElementVisible(element);
        return element.getText();
    };

    this.getNewsletterStatus = function () {
        return this.toggleNewsletter.getAttribute('class');
    };

    this.clickUpdateSupportPin = function () {
        commonHelper.waitForElementAndClick(this.buttonUpdateSupportPin);
    };

    this.profileRowDisabled = function (rowName) {
        return $('[ng-class*="' + rowName + '"].item.disabled');
    };
};

module.exports = new UserProfilePage();