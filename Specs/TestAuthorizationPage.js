//Steps:
//1. Open Home page
//2. Click on "LOG IN" text
//3. On the authorization page enter valid email and password for previously registered user (to check entered password, click on "eye” icon in password field.)
//4. Click "Login" button
//Expected Result:
//1. Home page has to be opened
//2. Authorization page has to be opened
//3. After click on "eye" icon for password field, password should be displayed
//4. "Log in" button has to be changed on "User@email" button (with dropdown menu) from the left side in the Header of the page


var testData = require('../Data/TestConstants.js');
var homePage = require('../Pages/HomePage.js');
var loginPage = require('../Pages/LoginPage.js');

describe('Test Authorization page', function() {
	it('Test Authorization page', function() {
	// 1.navigate to home page
    homePage.navigateToURL();

    //2.click on Log In
    console.log('Loggin in...');
    homePage.clickLoginButton();

    //3.enter valid email and password
    //4.Click "Login" button
    console.log('Entering email and password...');
    loginPage.logIn(testData.Constants.VALID_LOGIN,testData.Constants.VALID_PASSWORD);
    browser.sleep(testData.Timeout.LONGER_WAIT_MILI);

    //assert "Log in" button has changed to "User@email" button
    loginPage.getUserCertificatesButton().getText().then(function(certificateButtonText) {
    	console.log('Certificate button text = ' + certificateButtonText);
    	expect(certificateButtonText).toEqual(testData.Constants.VALID_LOGIN,
    														"Certificate button text doesn`t match user login");
    														});

    //assert dropdown menu is displayed
    loginPage.clickDropdownButton();
    expect(loginPage.getDropdownContainer().isDisplayed()).toBe(true,"Dropdown container isn`t displayed")

	});
});