var testData = require('../Data/TestConstants');
var locators = require('../Data/Locators');

var LoginPage = function() {
// elements
var loginButton = element(by.css(locators.LoginPage.LOGIN_BUTTON));
var showPasswordButton = element(by.css(locators.LoginPage.SHOW_PASSWORD_BUTTON));
var userCertificatesButton = element(by.css(locators.LoginPage.USER_CERTIFICATES_BUTTON));
var emailField = element(by.css(locators.LoginPage.EMAIL_INPUT));
var passwordField = element(by.css(locators.LoginPage.PASSWORD_INPUT));
var dropdownButton = element(by.css(locators.LoginPage.DROPDOWN_BUTTON));
var dropdownContainer = element(by.css(locators.LoginPage.DROPDOWN_CONTAINER));
var notRegisteredUserMessage = element(by.css(locators.LoginPage.NOT_REGISTERED_USER_MESSAGE));
var emailErrorMessage = element(by.css(locators.LoginPage.EMAIL_ERROR_MESSAGE));
var passwordErrorMessage = element(by.css(locators.LoginPage.PASSWORD_ERROR_MESSAGE));
var logoutButton = element(by.css(locators.LoginPage.LOGOUT_BUTTON));
var profileButton = element(by.css(locators.LoginPage.PROFILE_BUTTON));

// methods
    this.inputEmail = function (email) {
    this.getEmailInput().sendKeys(email);
    };

    this.inputPassword = function (password) {
        this.getPasswordInput().sendKeys(password);
    };

    this.clickLogin = function () {
    this.getLoginButton().click();
    };

     /**
	 * Enters email and password, then comfirms input
	 * @param Email
	 * @param Password
	 */
    this.logIn = function(email,password) {
    this.inputEmail(email);
    this.inputPassword(password);
    this.clickLogin();
    }

    this.clickShowPassword = function () {
        this.getShowPasswordButton().click();
    };

    this.clickDropdownButton = function () {
            this.getDropdownButton().click();
    };

    this.clickLogoutButton = function () {
                this.getLogoutButton().click();
     };

    this.clickProfileButton = function () {
                    this.getProfileButton().click();
         };

    this.getLoginButton = function() {
		return loginButton;
	};

	this.getShowPasswordButton = function() {
    		return showPasswordButton;
    };

	this.getEmailInput = function() {
		return emailField;
	};

	this.getPasswordInput = function() {
		return passwordField;
	};

	this.getUserCertificatesButton = function() {
    		return userCertificatesButton;
    };

    this.getDropdownButton = function() {
    		return dropdownButton;
    };

    this.getDropdownContainer = function() {
        	return dropdownContainer;
    };

     this.getNotRegisteredUserMessage = function() {
            return notRegisteredUserMessage;
    };

     this.getEmailErrorMessage = function() {
            return emailErrorMessage;
    };

    this.getPasswordErrorMessage = function() {
            return passwordErrorMessage;
    };

    this.getLogoutButton = function() {
                return logoutButton;
    };

    this.getProfileButton = function() {
                    return profileButton;
    };
};

module.exports = new LoginPage();