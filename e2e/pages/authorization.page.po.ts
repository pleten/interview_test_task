import {BaseComponent} from '../shared/component/base-component';
import {$, ElementFinder} from 'protractor';
import {safeClick} from "../shared/helpers/wd-helper";

export class AuthorizationPagePo extends BaseComponent {
    pageUrl = 'https://www.ssls.com/authorize';
    pageTitle: ElementFinder = $('.page-title-box');
    emailField: ElementFinder = $('.email input');
    passwordField: ElementFinder = $('.password input');
    passwordShow: ElementFinder = $('.password [type="text"]');
    showPasswordButton: ElementFinder = $('.icon-eye');
    loginButton: ElementFinder = $('.authorization-content [type="submit"]');

    async logIn(email: string, password: any) {
        await this.sendQuery(this.emailField, email);
        await this.sendQuery(this.passwordField, password);
        await safeClick(this.loginButton);
    }
}