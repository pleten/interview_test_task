var _ = require('lodash');

var Profile = function() {
    var self = this;

    this.form = $('.panel form');
    this.rows = this.form.$$('.item');
    this.newsToggle = element(by.model('user.newsletterOn'));
    this.supportPinRefreshBtn = element(by.model('user.supportPin'));

    /**
     * Returns profile data object if filter is not provided.
     * Returns specific profile row data object if filter is provided.
     * @param {string} filter - object with filtering params
     * @returns {Promise<Object>}
     */
    this.getData = function(filter) {
        var profile = {};
        var name,value;

        return self.rows.each(function(row, index) {
            browser.controlFlow().execute(function() {
                row.$('.terms').getText().then(function(text) {
                    name = text;
                });
            }).then(function() {
                row.$('.description').getText().then(function(text) {
                    value = text;
                });
            }).then(function() {
                (name.includes(filter)) && (profile[name] = value);
                (typeof filter === 'undefined') && (profile[name] = value);
                (typeof filter === 'undefined' && name.includes("Newsletter")) && (self.newsToggle.getAttribute('checked').then(function(value) {
                    profile[name] = value;
                }));
            })
        }).then(function() {
            return profile;
        })
    }

    this.isDataInvalid = function(data) {
        for (var key in data) {
            return (data[key] == null || data[key].length === 0);
        }
    }

    /**
     * Verifies retrieved profile data against provided test data
     * @param {Object} profileData - profile test data
     * @returns {Promise<Boolean>}
     */
    this.verifyData = function(profileData) {
        return self.getData().then(function(data) {
            return _.isEqual(profileData, data);
        });
    }

}

module.exports = Profile;
