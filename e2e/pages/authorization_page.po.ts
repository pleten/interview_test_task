import { browser, $, $$, ElementFinder, protractor } from "protractor";

export class AuthorizationPage {

    email: string = 'ssls.automation+5@gmail.com';

    password: string = '123456';

    EC = protractor.ExpectedConditions;

    title: ElementFinder = $('.page-title-box');

    inputEmail: ElementFinder = $$('input[type*="email"]').first();

    inputPassword: ElementFinder = $('input[placeholder*="password"]');

    loginBtn: ElementFinder = $('.btn.block.primary');

    iconEye: ElementFinder = $('.btn-input.btn-input-block');

    popUpNotification: ElementFinder = $('span[class*="noty_text"]');

    userEmailBtn: ElementFinder = $('.btn.btn-s.round.filled.user-btn.ng-binding');

    dropdownBtn: ElementFinder = $('.btn.btn-s.round.filled.dropdown-btn.ng-isolate-scope');

    logOutBtn: ElementFinder = $('.drop-button');

    viewProfile: ElementFinder = $('.drop-link[href*="/user/profile"]');

    wrongTypeEmailMsg: ElementFinder = $$('span[class*="tooltip-text"]').first();

    emptyEmailMsg: ElementFinder = $$('span[class*="tooltip-text"]').get(1);

    emptyPasswordMsg: ElementFinder = $$('span[class*="tooltip-text"]').get(2);

    notRegisteredUserMsg: ElementFinder = $('span[class*="noty_text"]');


    navigateTo() {
        browser.get('/authorize');
    }

    fillEmailPassFields(email: string, password: string) {
        this.inputEmail.sendKeys(email);
        this.inputPassword.sendKeys(password);
    }

    loginBtnClick() {
        this.loginBtn.click();
    }

    waitNotification(notification: ElementFinder) {
        browser.wait(this.EC.visibilityOf(notification), 3000);
    }

    navigateAndlogIn() {
        this.navigateTo();
        this.fillEmailPassFields(this.email, this.password);
        this.loginBtn.click();
    }

    logOut() {
        this.dropdownBtn.click();
        this.logOutBtn.click();
    }

    dropBtnAndViewProfileClick() {
        this.dropdownBtn.click();
        this.viewProfile.click();
    }
}