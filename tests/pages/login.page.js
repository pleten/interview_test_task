import Page from './page';
import Wd from '../core/wd';
import {config} from "../config/test-config";

class LoginPage extends Page {

	// Page elements
	// buttons
	loginButton() { return '//a[@ui-sref="authorize.index"]'; }
	showHideButton() { return '[ng-click="showPassword = !showPassword"]'; }
	authButton() { return '[type="submit"].primary'; }
	userButton() { return '.user-btn'; }

	// fields
	emailField() { return '[name="email"][ng-model="form.email"]'; }
	passwordField() { return '[name="password"]'; }

	//notifications
	notificationOfNonExistingEmail() { return '.noty_text'; }
	notificationOfInvalidEmail() { return `//*[@class='form-group email']/div[1]/div/div/*[@class='tooltip-text']`; }
	notificationOfEmptyEmail() { return `//*[@class='form-group email']/div[2]/div/div/*[@class='tooltip-text']`; }
	notificationOfEmptyPassword() { return `//*[@class='form-group']/div[2]/div/div/*[@class='tooltip-text']`; }

	// others
	authorizationTitle() { return `//h1[contains(text(),'Authorization')]`;}
	homePageTitle() { return '[ng-if="!prodListCtrl.productCategory.name"]>.ng-scope';}


	// Page actions
	open() {
		super.open('');
	}

	proceedToAuthPage() {
		Wd.click(this.loginButton());
	}

	titleIsShown(title) {
		switch(title.toLowerCase()){
			case 'auth':
				return Wd.elementIsDisplayed(this.authorizationTitle());
			case 'home':
				return Wd.elementIsDisplayed(this.homePageTitle());
		}
	}

	fillFormWith(email, password) {
		Wd.setValue(this.emailField(), email);
		Wd.setValue(this.passwordField(), password);
		Wd.click(this.showHideButton());
	}

	getPasswordText() {
		return Wd.getValue(this.passwordField());
	}

	getStatusOfPassswordField() {
		return Wd.getAttribute(this.passwordField(),'type');
	}

	submitLoginForm() {
		Wd.click(this.authButton());
	}

	getTextOfProfileButton() {
		return Wd.getText(this.userButton());
	}

	getTextOfNonExistingEmailNotification() {
		Wd.waitForDisplayed(this.notificationOfNonExistingEmail(),3000);
		return Wd.getText(this.notificationOfNonExistingEmail());
	}

	getTextOfInvalidEmailNotification() {
		Wd.waitForDisplayed(this.notificationOfInvalidEmail(),3000);
		return Wd.getText(this.notificationOfInvalidEmail());
	}

	getTextOfEmptyEmailNotification() {
		Wd.waitForDisplayed(this.notificationOfEmptyEmail(),3000);
		return Wd.getText(this.notificationOfEmptyEmail());
	}

	getTextOfEmptyPasswordNotification() {
		Wd.waitForDisplayed(this.notificationOfEmptyPassword(),3000);
		return Wd.getText(this.notificationOfEmptyPassword());
	}

	getCurrentURL() {
		return browser.getUrl();

	}

	loginAsValidUser(email,password) {
		this.open(config.baseUrl);
		this.proceedToAuthPage();
		this.fillFormWith(email, password);
		this.submitLoginForm();
	}

	reLogin(email, password) {
		this.open(config.baseUrl);
		browser.pause(2000);
		if (Wd.elementIsDisplayed(this.loginButton())) {
			this.loginAsValidUser(email,password);
		}
	}
}

export default new LoginPage();
