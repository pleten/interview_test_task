'use strict';

var BaseTest = require('../Tests/BaseTest');
var AuthorizationPage = require('../Pages/AuthorizationPage');


var baseTest = new BaseTest();
var authorizationPage = new AuthorizationPage();

describe('AuthorizationPage', function() {

	it('should click login', function() {
		baseTest.openPage('/');
		authorizationPage.login();
	});
});