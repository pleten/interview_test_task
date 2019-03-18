import {BaseComponent} from '../shared/component/base-component';
import {$, ElementFinder} from 'protractor';
import {safeClick} from "../shared/helpers/wd-helper";

export class HeaderPo extends BaseComponent {
    logInButton: ElementFinder = $('.log-box a');
    profileBox: ElementFinder = $('.profile-box');
    dropDownMenu: ElementFinder = $('.profile-box .dropdown-btn');
    userProfileButton: ElementFinder = $('[ui-sref="user.profile"]');
    logoutButton: ElementFinder = $('[ng-click="$ctrl.logout()"]');

    async logOut() {
        await safeClick(this.dropDownMenu);
        await safeClick(this.logoutButton);
    }

    async openProfile() {
        await safeClick(this.dropDownMenu);
        await safeClick(this.userProfileButton);
    }
}