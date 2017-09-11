import { browser, $, ElementFinder } from "protractor";

export class ProfilePage {

    supportPinButton: ElementFinder = $('button[name="supportPin"]');

    supportPinValue: ElementFinder = $('div[ng-class*="pin"] .description span');

    newsletterBtn: ElementFinder = $('div[ng-class*="newsletter"] .description button');

    navigateTo() {
        browser.get('/user/profile');
    }

    getFieldText(fieldName: string) {
        return $('span[ng-hide*="' + fieldName + '"]').getText();
    }
}
