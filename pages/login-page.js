const logInButton = $('.log-box');
const emailInput = $('input[type="email"]');
const passwordInput = $('input[placeholder="Enter password"]');
const showPasswordButton = $('span.icon.icon-eye');
const loginToWebSite = $('button[type="submit"]');
const openDropdownButton = $('button.dropdown-btn');
const profileDropDownButton = $('a.user-btn');
const logOutButton = $('button[ng-click="logout()"]');
const errorMessageBlock = $('span.noty_text');
const tootipErrors = $$('.tooltip-error');

export default class LoginPage {
	goToHomePage() {
		browser.get('https://www.ssls.com');
	};

	getBrowserUrl() {
		return browser.getCurrentUrl();
	};

	goToLoginPage() {
    return logInButton.click();
  }

  checkEnteredCredentials(email, pass) {
    emailInput.sendKeys(email);
    passwordInput.sendKeys(pass);
    return showPasswordButton.click();
  }

  makeWebSiteLogin() {
	  return loginToWebSite.click();
  }

  returnPasswordInputField() {
	  return passwordInput.getAttribute('type');
  }

  returnProfileButton() {
	  return profileDropDownButton;
  }

  doLogOut() {
	  openDropdownButton.click();
	  return logOutButton.click();
  }

  checkErrorMessageText() {
	  return errorMessageBlock;
  }

  returnTooltipsErrors() {
	  return tootipErrors;
  }

  clickOnOpenDropDownButton() {
	  return openDropdownButton.click();
  }
}