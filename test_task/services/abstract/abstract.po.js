var commonHelper = require('./../../helpers/common.helper.js');

var AbstractPage = function () {

    //--------------------------------------------------------------------------
    // Elements
    //--------------------------------------------------------------------------

    this.btnLogIn = $('a[ui-sref="authorize.index"]');
    this.btnUser = $('a.user-btn');
    this.notification = $('.noty_message');
    this.notificationText = this.notification.$('span');
    this.btnProfileMenu = $('.profile-box .dropdown-btn');
    this.btnLogout = $('button[ng-click="logout()"]');
    this.btnViewProfile = $('[ui-sref="user.profile"]');

    //--------------------------------------------------------------------------
    // Functions
    //--------------------------------------------------------------------------

    this.openLoginForm = function() {
        commonHelper.waitUntilElementVisible(this.btnLogIn);
        this.btnLogIn.click();
    };

    this.openViewProfile = function () {
        this.openProfileMenu();
        this.clickViewProfile();
    };

    this.logout = function() {
        this.openProfileMenu();
        this.clickLogout();
    };

    this.openProfileMenu = function () {
        commonHelper.waitUntilElementVisible(this.btnProfileMenu);
        this.btnProfileMenu.click();
    };

    this.clickLogout = function () {
        this.btnLogout.click();
    };

    this.clickViewProfile = function () {
        commonHelper.waitUntilElementVisible(this.btnViewProfile);
        this.btnViewProfile.click();
    }
};

module.exports = AbstractPage;
