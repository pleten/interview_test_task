import { $, browser, ElementFinder } from 'protractor';
import { AbstractPage } from './abstract-page.po';

export class HeaderPage {

    public static buttonLogIn: ElementFinder = $('.log-box .btn.flat-dark');
    public static buttonProfileName: ElementFinder = $('.log-box .profile-box');
    public static dropdownProfile: ElementFinder = $('.log-box .dropdown-btn');
    public static buttonLogout: ElementFinder = $('.dropdown.ng-isolate-scope .drop-button');
    public static buttonViewProfile: ElementFinder = $('.dropdown.ng-isolate-scope [ui-sref="user.profile"]');

    public static goToProfilePage(): any {
        HeaderPage.dropdownProfile.click();
        HeaderPage.buttonViewProfile.click();
    }

}