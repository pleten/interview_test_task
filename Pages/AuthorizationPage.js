'use strict';

var AuthorizationPage = function() {

	var btnLogIn = element(by.cssContainingText('.btn.flat-dark', 'Log in'));

	this.login = function() {
		btnLogIn.click();
	};

	this.openAuthorization = function(url) {
        browser.get(browser.baseUrl + url);
    };
};

module.exports = AuthorizationPage;