'use strict';

let HomePage = function() {
    let loginButton = element(by.css('a[href="/authorize"]'));
    let currentUser = element(by.css('a.btn[ui-sref="user.certificates.list"]'));
    let userMenu = element(by.css('button[nc-dropdown-trigger="statusOpened"]'));
    let logoutButton = element(by.css('button[ng-click="$ctrl.logout()"]'));
    let userProfileButton = element(by.css('a[href="/user/profile"]'));
    let personalSSL = element(by.css('[ng-class*=low]'));
    let multiDomainSSL = element(by.xpath('//a[contains(.,"multi-domain")]'));
    let cheapestSorting = element(by.css('span.icon-sort-alt-up'));
    let featuredSorting = element(by.css('span.icon-sort-alt-down'));


    this.get = () => {
        browser.get('https://www.ssls.com/');
    };

    this.openLoginPage = () => {
        return loginButton.click();
    };

    this.getCurrentUser = () => {
        return currentUser.getText();
    };

    this.logout = () => {
        userMenu.click();
        logoutButton.click();
    };

    this.openProfilePage = () => {
        userMenu.click();
        userProfileButton.click();
    };

    this.selectPersonalSSL = () => {
        personalSSL.click();
    };

    this.selectMultiDomainSSL = () => {
        multiDomainSSL.click();
    };

    this.getPrices = async () => {

        return new Promise(async (resolve, reject) => {
            let arr = [];

            let elements = element.all(by.css('div.ssl-price-box price:not(.base-price)'));
            let elementsCount = await elements.count();

            for (let i = 0; i < elementsCount; i++) {
                let price = await elements.get(i).getAttribute('value');
                arr.push(price);
                if (arr.length === elementsCount) {
                    resolve(arr);
                }
            }
        });
    };

    this.applyCheapestSorting = () => {
        cheapestSorting.click();
    };

    this.applyFeaturedSorting = () => {
        featuredSorting.click();
    };

};
module.exports = new HomePage();
