/* eslint-disable angular/timeout-service */
/* eslint-disable no-console */
"use strict";

const authPage = require("../po/authorization/authorization.po"),
    homePage = require("../po/home/home.po"),
    headerPage = require("../po/layout/header.po"),
    profilePage = require("../po/profile/profile.po");

const Helpers = function () {
    this.logIn = async function (email, password) {
        const present = await authPage.emailInput.isPresent();
        let displayed;
        if (present) {
            displayed = await authPage.emailInput.isDisplayed();
        }
        if (!present || !displayed) {
            browser.wait(EC.elementToBeClickable(headerPage.logInLink), 20000, 'LogIn link does not become clickable');
            headerPage.logInLink.click();
        }
        authPage.wait();
        authPage.emailInput.sendKeys(email);
        authPage.passwordInput.sendKeys(password);
        authPage.loginButton.click();
        browser.wait(EC.visibilityOf(homePage.promoBanner), 30000, "Promo banner is not visible.");
    };

    this.logOut = async function () {
        const present = await headerPage.logOutLink.isPresent();
        let displayed;
        if (present) {
            displayed = await headerPage.logOutLink.isDisplayed();
        }
        if (!present || !displayed) {
            browser.wait(EC.elementToBeClickable(headerPage.userDropdownMenu), 20000, 'Dropdown menu icon does not become clickable');
            headerPage.userDropdownMenu.click();
        }
        browser.wait(EC.elementToBeClickable(headerPage.logOutLink), 10000, 'Logout link does not become clickable');
        headerPage.logOutLink.click();
        authPage.wait();
    };

    this.openProfilePage = function () {
        browser.wait(EC.elementToBeClickable(headerPage.userDropdownMenu), 10000, 'User dropdown menu does not become clickable');
        headerPage.userDropdownMenu.click();
        browser.wait(EC.elementToBeClickable(headerPage.viewProfileLink), 10000, 'View profile link does not become clickable');
        headerPage.viewProfileLink.click();
        profilePage.wait();
    };

    this.unselectFilters = async function () {
        // eslint-disable-next-line protractor/no-angular-classes
        const rows = await element.all(by.css("div.filter-row.ng-scope"))
        const rowsSum = rows.length;

        const columns = await element.all(by.css(".filter-row:nth-child(1) .filter-item"));
        const columnsSum = columns.length;

        for (let row = 1; row <= rowsSum; row++) {
            for (let column = 1; column <= columnsSum; column++) {
                let elem = await element(by.css('.filter-row:nth-child(' + row + ') .filter-item:nth-child(' + column + ') a.active'));
                if (await elem.isPresent()) {
                    await element(by.css('.filter-row:nth-child(' + row + ') .filter-item:nth-child(' + column + ') a')).click();
                }
            }
        }
    };

    this.filterByCardname = async function (cardname) {
        const sslCards = await element.all(by.css(".cert-list .ssl-content"))
        const sslCardsSum = sslCards.length;
        let values;

        for (let row = 1; row <= sslCardsSum; row++) {
            values = element.all(by.css(".cert-list div:nth-child(" + row + ") .text")).map(function (elm) {
                return elm.getText();
            });
            expect(await values).toContain(cardname, "Here is no filtered data - " + await element(by.css('.cert-list div:nth-child(' + row + ') h3')).getText());
        }
    };

    // compare values got from the page with the sorted values 
    this.sortedByPrice = async function () {
        let values,
            valuesBeforeSorting,
            sortedValues;

        // eslint-disable-next-line protractor/no-repetitive-selectors
        values = element.all(by.css(".cert-list .ssl-content price.lg-price")).map(function (elm) {
            return elm.getAttribute("value");
        });
        valuesBeforeSorting = await values;
        sortedValues = valuesBeforeSorting.toString().split(",").sort((a, b) => a - b);

        expect(await values).toEqual(sortedValues);
    };

    // custom Expected Condition to wait for the URL to change and match a given pattern
    this.urlChanged = function (pattern) {
        return function () {
            return browser.getCurrentUrl().then(function (actualUrl) {
                return new RegExp(pattern).test(actualUrl);
            });
        };
    };
};

module.exports = new Helpers();
