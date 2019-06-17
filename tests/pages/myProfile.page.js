import Page from './page';
import Wd from '../core/wd';
import {config} from "../config/test-config";

class MyProfilePage extends Page {

	// Page elements
	// buttons
    logoutButton() { return '[ng-click="$ctrl.logout()"]'; }
    viewProfileButton() { return '[ui-sref="user.profile"]'; }
    refreshPinButton() { return '[name="supportPin"]'; }
    enabledToogleButton() {return '//*[@class="toggle-btn on"]'}

	// fields
    userDetailsTextField(name) { return `//*[@name='form']/div[@class="item"]/div[@class="terms"]/*[.='${name}']/../../div[@class="description"]/span`; }

	// others
    usersDropDownMenu() { return '[nc-dropdown-trigger="statusOpened"]'; }

	// Page actions
gut
    logout() {
        Wd.click(this.usersDropDownMenu());
        Wd.click(this.logoutButton());
    }

    openProfilePage() {
        Wd.click(this.usersDropDownMenu());
        Wd.click(this.viewProfileButton());
    }

    getUserDetailsText() {
        return {
            name: Wd.getText(this.userDetailsTextField('Name')),
            email: Wd.getText(this.userDetailsTextField('Email')),
            password: Wd.getText(this.userDetailsTextField('Password')),
            phone: Wd.getText(this.userDetailsTextField('Phone')),
            address: Wd.getText(this.userDetailsTextField('Address')),
            pin: Wd.getText(this.userDetailsTextField('Support pin')),
            toogle: this.checkToogleButton()
        }
    }

    checkToogleButton() {
        return Wd.elementIsDisplayed(this.enabledToogleButton());
    }

    refreshPin(){
        Wd.click(this.refreshPinButton());
        Wd.refreshPage();
    }

    compareObjects(obj1, obj2) {
        let result = [];
        for (let key in obj1) {
            let correctObjInfo = obj1[key];

            browser.waitUntil( () => obj2[key] === correctObjInfo === true,
                Wd.defaultWaitTime,
                `Time limit was exceeded. ${key} Key with ${obj1[key]} value in obj1 !== ${key} Key with ${obj2[key]} value in obj2`
            );

            result.push(obj2[key] === correctObjInfo);
        }

        return result.every(el => el === true);
    }

}

export default new MyProfilePage();
