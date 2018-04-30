const bottlejs  = require('bottlejs').pop('test');

bottlejs.factory('PageObject', function () {
    return {
        getAbstractPage: function () {
            const abstractPage = require('./abstract/abstract.po.js');
            return new abstractPage();
        },

        getLoginPage: function () {
            const loginPage = require('./user/login.po.js');
            return new loginPage();
        },

        getProfilePage: function () {
            const profilePage = require('./user/profile.po.js');
            return new profilePage();
        },

        getHomePage: function () {
            const homePage = require('./home/home.po.js');
            return new homePage();
        }
    };
});

module.exports = bottlejs;
