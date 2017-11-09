'use strict';

let BaseTest = require('../Tests/BaseTest');
let BasePage = require('../Pages/BasePage');
let HomePage = require('../Pages/HomePage');

describe('Home page. Filters', function() {
    let baseTest = new BaseTest();
    let basePage = new BasePage();
    let homePage = new HomePage();
    let countExpectedPersonalSslCertificates = 3;
    let countExpectedPersonalMultiDomainSslCertificates = 1;
    let countExpectedAllSslCertificates = 13;
    let items;

    afterAll(function() {
        baseTest.clearLocalStorage();
    });

    it('should show all personal certificates', function() {
        baseTest.openPage('/');
        homePage.btnPersonalFilter.click();
        expect(homePage.listSslCertificates.count()).toEqual(countExpectedPersonalSslCertificates);
        expect(element(by.cssContainingText('.ssl-name', 'PositiveSSL')).isDisplayed()).toBe(true);
        expect(element(by.cssContainingText('.ssl-name', 'PositiveSSL Multi-Domain')).isDisplayed()).toBe(true);
        expect(element(by.cssContainingText('.ssl-name', 'PositiveSSL Wildcard')).isDisplayed()).toBe(true);
    });

    it('should show all multi-domain + personal certificates', function() {
        baseTest.openPage('/');
        homePage.btnPersonalFilter.click();
        homePage.btnMultiDomainFilter.click();
        expect(homePage.listSslCertificates.count()).toEqual(countExpectedPersonalMultiDomainSslCertificates);
        expect(element(by.cssContainingText('.ssl-name', 'PositiveSSL Multi-Domain')).isDisplayed()).toBe(true);
    });

    it('should sort by Featured by default', function() {
        baseTest.openPage('/');
        expect(homePage.listSslCertificates.count()).toEqual(countExpectedAllSslCertificates);
    });

    it('should sort by Cheapest', function() {
        baseTest.openPage('/');
        homePage.btnCheapest.click();
        expect(homePage.listSslCertificates.count()).toEqual(countExpectedAllSslCertificates);
        var values = homePage.listSslPrice.all(by.tagName('price')).getAttribute('value');
        expect(values).toEqual(['499', '2499', '2598', '2799', '4299', '5699', '7722', '7722', '7899', '13899', '8499', '9499', '12999', '15788', '21589']);
    });
});