import {protractor, browser, element, by} from 'protractor';
import {Functions} from './functions.po';

import {
    wrondData,
    rightData,
} from './fixtures'

describe('Login', function () {

    it("go to login page", function () {
        element(by.className('btn btn-s round filled dropdown-btn ng-isolate-scope'));
        let login = element(by.cssContainingText('View profile'));
        expect(login.getText()).toBe('View profile');
        login.click();
        let title = element(by.className("page-title"));
        expect(title.getText()).isDisplayed('Profile');
    });

    it("6. My profile page. Client area", function () {
        let name = element(by.xpath('//*[@id="ng-app"]/body/div[1]/div/ui-view/div/div[2]/div/div[2]/div/form/div[1]/div[2]/span'));
        expect(name.getText()).toBe('Vasya Pupkin');

        let email = element(by.xpath('//*[@id="ng-app"]/body/div[1]/div/ui-view/div/div[2]/div/div[2]/div/form/div[2]/div[2]/span'));
        expect(email.getText()).toBe('ssls.automation+5@gmail.com');

        let pass = element(by.xpath('//*[@id="ng-app"]/body/div[1]/div/ui-view/div/div[2]/div/div[2]/div/form/div[3]/div[2]/span'));
        expect(pass.isDisplayed());

        let phone = element(by.xpath('//*[@id="ng-app"]/body/div[1]/div/ui-view/div/div[2]/div/div[2]/div/form/div[4]/div[2]/span'));
        expect(phone.getText()).toBe('+380 57123456789');

        let address = element(by.xpath('//*[@id="ng-app"]/body/div[1]/div/ui-view/div/div[2]/div/div[2]/div/form/div[5]/div[2]/span'));
        expect(address.getText()).toBe('Diagon alley 2, Misto, Uryupinsk 612120, Ukraine');

        let pin = element(by.xpath('//*[@id="ng-app"]/body/div[1]/div/ui-view/div/div[2]/div/div[2]/div/form/div[6]/div[2]'));
        expect(pin.getText()).toBe('eCU5');

        let btn = element(by.xpath('//*[@id="ng-app"]/body/div[1]/div/ui-view/div/div[2]/div/div[2]/div/form/div[7]/div[2]'));
        expect(btn.isDisplayed());

    });

    it("7. My profile page. Refresh support pin", function () {
        element(by.name('supportPin')).click();
    });

    it("8. Home page. Filters", function () {
        browser.get('https://www.ssls.com/');
        element(by.xpath('//*[@id="ng-app"]/body/div[1]/div/div/div[2]/div[2]/div[1]/div[1]/a')).click();
        element().click();

        element(by.xpath('//*[@id="ng-app"]/body/div[1]/div/div/div[2]/div[2]/div[2]/div[2]/a').click());
        element().click();

        element(by.xpath('//*[@id="ng-app"]/body/div[1]/div/div/div[2]/div[3]/a')).click();
    });


});