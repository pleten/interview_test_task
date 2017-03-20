/*Steps:
1. Open Home page
2. Click on "LOG IN" text
3. On the authorization page don’t fill Email and Password
4. Click "Login" button
Expected Result:
1. Home page has to be opened
2. Authorization page has to be opened
3. If user not filled all fields, errors messages such as:
3.1. For Email field: “Oops, please enter your email”
3.2. For Password field: “Looks like you’ve missed this one should be displayed”*/

var testData = require('../Data/TestConstants.js');
var homePage = require('../Pages/HomePage.js');
var loginPage = require('../Pages/LoginPage.js');

describe('Test Authorization page empty fields', function() {
	it('Test Authorization page empty fields', function() {
	// 1.navigate to home page
    homePage.navigateToURL();

    //2.click on Log In
    console.log('Loggin in...');
    homePage.clickLoginButton();
    browser.sleep(testData.Timeout.SHORT_WAIT_MILI);

    //3.Log in with empty login and password fields
    console.log('Clicking Log In button...');
    loginPage.clickLogin();

    //assert no email error message is displayed
    loginPage.getEmailErrorMessage().getText().then(function(emailErrorMessageText) {
    	console.log('No email message text = ' + emailErrorMessageText);
    	expect(emailErrorMessageText).toEqual(testData.Constants.NO_EMAIL_TEXT,
    														"Email error message text is incorrect");
    														});

    //assert no password error message is displayed
        loginPage.getPasswordErrorMessage().getText().then(function(passwordErrorMessageText) {
        	console.log('No password message text = ' + passwordErrorMessageText);
        	expect(passwordErrorMessageText).toEqual(testData.Constants.NO_PASSWORD_TEXT,
        														"Password error message text is incorrect");
        													});
	});
});