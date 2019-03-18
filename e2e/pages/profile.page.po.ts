import {BaseComponent} from '../shared/component/base-component';
import {$, ElementFinder} from 'protractor';

export class ProfilePagePo extends BaseComponent {
    public nameValue;
    public emailValue;
    public passwordValue;
    public phoneValue;
    public addressValue;
    public supportPinValue;
    public newsletterValue;

    nameField: ElementFinder = $('span[ng-hide*="name"]');
    emailField: ElementFinder = $('span[ng-hide*="email"]');
    passwordField: ElementFinder = $('span[ng-hide*="password"]');
    phoneField: ElementFinder = $('span[ng-hide*="phone"]');
    addressField: ElementFinder = $('span[ng-hide*="address"]');
    supportPinField: ElementFinder = $('[ng-class*="pin"] .description>span');
    updateSupportPin: ElementFinder = $('.icon-arrows-cw');
    newsletterOn: ElementFinder = $('.toggle-btn.on');
}