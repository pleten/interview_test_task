import {protractor, browser, element, by} from 'protractor';
import {Functions} from './functions.po';

import {
    wrondData,
    rightData,
} from './fixtures'

describe('Login', function () {

    it("go to login page", function () {
        let login = element(by.className("btn flat-dark ng-scope"));
        login.click();
        let title = element(by.className("page-title"));
        expect(title.getText()).toBe('Authorization');
    });

    it("4. Authorization page. Empty fields", function () {
        element(by.name("email"));
        element().clear();
        element(by.name("password"));
        element().clear();
        element(by.className("btn block primary"));
        element().click();
        let validEmail = element(by.xpath('//*[@id="ng-app"]/body/div[1]/div/ui-view/div/ng-include/div/div/form/div[1]/div/div[2]/div/div[1]/span'));
        expect(validEmail.getText()).toBe('Oops, please enter your email');
        let validPass = element(by.xpath('//*[@id="ng-app"]/body/div[1]/div/ui-view/div/ng-include/div/div/form/div[2]/div/div/div[1]/div/div[1]/span'));
        expect(validPass.getText()).toBe('Looks like you’vemissed this one');
    });

    it("3. Authorization page. Invalid email", function () {
        element(by.name("email"));
        element().clear();
        element().sendKeys(wrondData.email);
        element(by.name("password"));
        element().clear();
        element().sendKeys(wrondData.password);
        element(by.className("btn block primary"));
        element().click();
        let notification = element(by.id('noty_1205964222331330300'));
        expect(notification.getText()).toBe('Uh oh! Email or password is incorrect');
        element(by.className('icon icon-eye')).click();
    });

    it("2. Authorization page. Not registered user", function () {
        element(by.name("email"));
        element().clear();
        element().sendKeys();
        element(by.name("password"));
        element().clear();
        element(by.className("btn block primary"));
        element().click();
        let validEmail = element(by.className("noty_text"));
        expect(validEmail.getText()).toBe('Uh oh! Email or password is incorrect');
    });

    it("1. Authorization page (Welcome back!)", function () {
        element(by.name("email"));
        element().clear();
        element().sendKeys(rightData.email);
        element(by.name("password"));
        element().clear();
        element().sendKeys(rightData.password);
        element(by.className('btn block primary'));
        let check = element(by.className('profile-box'));
        expect(check.isDisplayed()).toBe(true);
    });

    it("5. Log Out.",function(){
        element(by.className('btn btn-s round filled dropdown-btn ng-isolate-scope')).click();
        element(by.className('drop-button')).click();
        let title = element(by.className('page-title'));
        expect(title.getText()).toBe('Authorization');
    });
});