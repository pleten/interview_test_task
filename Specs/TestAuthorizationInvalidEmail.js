/*Steps:
1. Open Home page
2. Click on "LOG IN" text
3. On the authorization page enter invalid email and valid password
4. Click "Login" button
Expected Result:
1. Home page has to be opened
2. Authorization page has to be opened
3. After click on "eye" icon in password field, password should be displayed
4. If user filled "Email" field with non-email value (eg. test@@test.com) error message such as: “Uh oh! This isn’t an email should be displayed”*/

var testData = require('../Data/TestConstants.js');
var homePage = require('../Pages/HomePage.js');
var loginPage = require('../Pages/LoginPage.js');

describe('Test Authorization page invalid email', function() {
	it('Test Authorization page invalid email', function() {
	// 1.navigate to home page
    homePage.navigateToURL();

    //2.click on Log In
    console.log('Loggin in...');
    homePage.clickLoginButton();

    //3.enter enter invalid email and valid password
    console.log('Entering email and password...');
    loginPage.logIn(testData.Constants.INVALID_LOGIN,testData.Constants.VALID_PASSWORD);
    browser.sleep(testData.Timeout.LONGER_WAIT_MILI);

    //assert errors message is displayed
    loginPage.getEmailErrorMessage().getText().then(function(emailErrorMessageText) {
    	console.log('Invalid email message text = ' + emailErrorMessageText);
    	expect(emailErrorMessageText).toEqual(testData.Constants.INVALID_EMAIL_MESSAGE_TEXT,
    														"Email error message text is incorrect");
    														});
	});
});