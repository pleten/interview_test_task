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
        expect(homePage.listSslCertificates.get(0).getText()).toEqual('EV SSL\n' +
            'SALE\n' +
            '$78.99/YR & UP $138.99/YR\n' +
            'Comodo\n' +
            '1 domain\n' +
            'www.site.com + site.com\n' +
            'EV (greenbar)\n' +
            'Very high assurance\n' +
            'To comparison');
        expect(homePage.listSslCertificates.get(12).getText()).toEqual('Multi-Domain SSL\n' +
            '$77.22/YR & UP\n' +
            'Comodo\n' +
            '3-100 domains\n' +
            'www.site.com or site.com\n' +
            'Organization validation\n' +
            'High assurance\n' +
            'To comparison');
    });

    it('should sort by Cheapest', function() {
        baseTest.openPage('/');
        homePage.btnCheapest.click();
        expect(homePage.listSslCertificates.count()).toEqual(countExpectedAllSslCertificates);
        expect(homePage.listSslCertificates.get(0).getText()).toEqual('PositiveSSL\n' +
            'HOT\n' +
            '$4.99/YR & UP\n' +
            'Comodo\n' +
            '1 domain\n' +
            'www.site.com + site.com\n' +
            'Domain validation\n' +
            'Low assurance\n' +
            'To comparison');
        expect(homePage.listSslCertificates.get(12).getText()).toEqual('EV Multi-Domain SSL\n' +
            'SALE\n' +
            '$157.88/YR & UP $215.89/YR\n' +
            'Comodo\n' +
            '3-100 domains\n' +
            'www.site.com or site.com\n' +
            'EV (greenbar)\n' +
            'Very high assurance\n' +
            'To comparison');
    });
});