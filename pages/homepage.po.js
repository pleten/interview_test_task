/**
 * Created by vbu on 2/15/17.
 */

var AutorizePage = require('./authorize.po');

var HomePage = function () {

    var page = this;

    var MenuItems = {
        PROFILE: 'View profile'
    };

    this.loginIfNeeded = function (user, password) {
        page.userButton.isPresent().then(function (present) {
            if (!present) {
                var authorize = new AutorizePage();
                authorize.open();
                authorize.loginAs(user, password);
            }
        })
    };

    this.dropdown = function () {

        return {

            open: function () {
                page.dropdownButton.click();
                browser.wait(EC.visibilityOf($('ul.dropdown')), 1000);
            },

           select : function (dropItem) {
               this.open();
               element(by.cssContainingText('.drop-item a', dropItem)).click()
           },
           
           logout: function () {
               this.open();
               $('[ng-click*=logout]').click();
           }
            
        }

    }

    this.openProfile = function () {
        page.dropdown().select(MenuItems.PROFILE)
    }

};

HomePage.prototype = Object.create({}, {

    dropdownButton: { get: function() { return $('.dropdown-btn'); }},
    userButton: { get: function() { return $('.user-btn'); }},

});

module.exports = HomePage;


