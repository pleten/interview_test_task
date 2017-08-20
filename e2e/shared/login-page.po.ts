import { browser, ElementFinder, $ } from 'protractor';
import { AbstractPage } from './abstract-page.po';
import { AppCredentials } from './app-credentials';
import { HeaderPage } from './header-page.po';

export class LoginPage {

    public static inputLogin: ElementFinder = $('.form-group.email input');
    public static inputPassword: ElementFinder = $('.input-box.password input');
    public static buttonLogIn: ElementFinder = $('.btn-box .btn.block.primary');
    public static alertInvalidCredentials: ElementFinder = $('.noty_text');
    public static tooltipIncorrectEmail: ElementFinder = $('.email .left-tooltip-box:nth-of-type(1) .tooltip-text');
    public static tooltipEmptyEmail: ElementFinder = $('.email .left-tooltip-box:nth-of-type(2) .tooltip-text');
    public static tooltipEmptyPassword: ElementFinder = $('.email-box .row:nth-of-type(2) .tooltip-text');


    public static login(): any {
        browser.get(AppCredentials.baseURL +'/authorize');
        AbstractPage.sendQuery(this.inputLogin, AppCredentials.userID);
        AbstractPage.sendQuery(this.inputPassword, AppCredentials.userPassword);
        this.buttonLogIn.click();
    }

    public static logout(): any {
        HeaderPage.dropdownProfile.click();
        HeaderPage.buttonLogout.click();
        browser.driver.manage().deleteAllCookies();
    }
   }
