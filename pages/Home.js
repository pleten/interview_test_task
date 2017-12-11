'use strict';

let I;

module.exports = {

    _init() {
        I = require('../steps_file.js')();
    },

    url: "/",

    locators: {
        fldLogin: {
            self: '//*[@class="log-box"]',

            btnLogin: '//*[text()[contains(.,"Log in")]]',

            drdPersonalMenu: {
                self: '//*[@class="btn btn-s round filled dropdown-btn ng-isolate-scope"]',

                optPurchasedCerts: 'Purchased certs',
                optOrderHistory: 'Order history',
                optAddFunds: 'Add funds',
                optViewProfile: 'View profile',
                optLogOut: 'Log out',
            }
        },

        filters: {
            ftrPersonal: "Personal",
            ftrBusiness: "Business",
            ftrEcommerce: "Ecommerce",
            ftrOneDomain: "one domain",
            ftrMultiDomain: "multi-domain",
            ftrSubdomains: "subdomains",
        },

        sortBy: {
            optCheapest: "Cheapest",
            optFeatured: "Featured",
        }
    },

    clickPersonalMenuOpt(opt) {
        let locator = '//*[text()[contains(.,"' + opt + '")]]';

        I.click(this.locators.fldLogin.drdPersonalMenu.self);
        I.waitForElement(locator, 2);
        I.click(locator);
    },

    getCertificatesDomainDescriptionContext(){
        return '//*[@class="ssl-content"]/*/p[2]';
    },

    getCertificatesAssuranceDescriptionContext(){
        return '//*[@class="ssl-content"]/*/p[5]';
    },

    getCertificatesPriceContext(){
        return '//*[@class="ssl-content"]/*/price[1]';
    },

    getCertificatesRatingContext(){
        return '//div[contains(@class, "rating stars")]';
    },
};
