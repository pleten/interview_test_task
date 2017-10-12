var _ = require('lodash');

var HomePage = function() {
    var self = this;
    var sslTestData = getSslItems();

    this.loginLink = element(by.linkText('LOG IN'));
    this.logoutLink = element(by.buttonText('Log out'));
    this.profileLink = element(by.linkText('View profile'));
    this.certificateList = $('.cert-list');
    this.profileBtn = $('.user-btn');
    this.profileMenu = $('.dropdown-btn');
    this.sortBtn = $('.sort-btn a');
    this.sslItemNames = $$('.ssl-name');
    this.filterButtons = $$('.filter-item a')

    /**
     * @returns {HomePage} HomePage
     */
    this.go = function() {
        browser.get('https://www.ssls.com');
        return this;
    };

    this.logout = function() {
        this.profileMenu.click();
        this.logoutLink.click();
    }

    this.viewProfile = function() {
        this.profileMenu.click();
        this.profileLink.click();
    }

    /**
     * Clicks specific filter button, e.g. 'PERSONAL', 'MULTI-DOMAIN'
     * @param {string} filterName
     */
    this.filterItemsBy = function(filterName) {
        self.filterButtons.filter(function(elem, index) {
            return elem.getText().then(function(text) {
                return text.includes(filterName);
            })
        }).each(function(element, index) {
            browser.executeScript('arguments[0].scrollIntoView()', element.getWebElement());
            element.click();
        })
    }

    /**
     * Sorts test data and compares it to retrieved ssl items
     * @param {string} propName - object property name used for sorting
     * @param {boolean} reverse - desc. or asc. order
     */
    this.verifySortingBy = function(propName, reverse) {
        var sortedTestItems = sslTestData.sort(sort_by(propName, reverse)).map(function(sortedItem) {
            return {
                name: sortedItem.name
            }
        });

       getSslData().then(function(sorted){
            expect(sorted).toEqual(sortedTestItems);
        });
    }

    /**
     * Filters test data and compares it to retrieved ssl items
     * @param {object} filterObj - object with filtering params
     * @returns {Promise<Boolean>}
     */
    this.verifyFilteringBy = function(filterObj) {
        var filteredSsls = sslTestData.filter(function(item) {
            for(var key in filterObj) {
                if(item[key] === undefined || item[key] != filterObj[key])
                    return false;
            }
            return true;
        }).map(function(elem, index) {
            return {
                name: elem.name
            }
        })

        return getSslData().then(function(data) {
            return _.isEqual(filteredSsls.sort(), data.sort());
        })
    }

    /**
     * Retrieves visible SSL items as an array of objects
     * @returns {Promise<Object>}
     */
    function getSslData() {
        return self.sslItemNames.map(function(eachName){
            return eachName.getText().then(function(sorted){
                return {name: sorted};
            });
        })
    }

    /**
     * Returns array of SSL object test data
     * @returns {Array}
     */
    function getSslItems() {
        var sslItems = browser.params.sslItems;
        var ssls = [];
        for (var i=0; i<13; i++) {
            var ssl = sslItems["sslItem_" + i];
            ssls.push(ssl);
        }
        return ssls;
    }

    function sort_by(field, reverse) {
        var key = function(x) {return x[field]};
        reverse = !reverse ? 1 : -1;

        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    }

}

module.exports = HomePage;
