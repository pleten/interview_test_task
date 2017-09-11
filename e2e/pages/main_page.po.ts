import { browser, $, ElementFinder, $$, ElementArrayFinder } from "protractor";

export class MainPage {

    logInBtn: ElementFinder = $('.btn.flat-dark.ng-scope');

    personalButtonFilter: ElementFinder = $$('.btn.block.round.control').first();

    sslSertificatesList: ElementArrayFinder = $$('.ssl-item');

    multiDomainButtonFiltr: ElementFinder = $$('.btn.block.round.control.ng-binding').get(1);

    cheapestFeaturedButton: ElementFinder = $('.btn.block.round.control.ng-scope');

    priceList: ElementArrayFinder = $$('.ssl-price-box');

    navigateTo() {
        browser.get('/');
    };

    logInBtnClick() {
        this.logInBtn.click();
    }

    substringPrice(longPrice: string): string {
        return longPrice.substring(1, 5).split('.')[0];
    }
}