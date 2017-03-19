/*Steps:
1. Open Home page
2. Click on "LOG IN" text
3. On the authorization page enter not registered email and any password
4. Click "Login" button
Expected Result:
1. Home page has to be opened
2. Authorization page has to be opened
3. After click on "eye" icon in password field, password should be displayed
4. If user not registered, errors messages such as: “
Uh oh! Email or password is incorrect should be displayed”*/

var testData = require('../Data/TestConstants.js');
var homePage = require('../Pages/HomePage.js');
var loginPage = require('../Pages/LoginPage.js');

describe('Test Authorization page not registered user', function() {
	it('Test Authorization page not registered user', function() {
	// 1.navigate to home page
    homePage.navigateToURL();

    //2.click on Log In
    console.log('Loggin in...');
    homePage.clickLoginButton();

    //3. enter not registered email and password
    console.log('Entering email and password...');
    loginPage.logIn(testData.Constants.NOT_REGISTERED_USER_LOGIN,testData.Constants.VALID_PASSWORD);
    browser.sleep(testData.Timeout.LONGER_WAIT_MILI);

    //assert errors message is displayed
    loginPage.getNotRegisteredUserMessage().getText().then(function(notRegisteredUserText) {
    	console.log('Not registered user message text = ' + notRegisteredUserText);
    	expect(notRegisteredUserText).toEqual(testData.Constants.NOT_REGISTERED_USER_MESSAGE_TEXT,
    														"Not registered user message text is incorrect");
    														});
	});
});