/*Preconditions:
1. User has to be logged in
Steps:
1. Click on triangle near the "User@email" button and select “Log out”
Expected Result:
1. After click "Log out" user should log out and  redirected on authorization page*/

var testData = require('../Data/TestConstants.js');
var homePage = require('../Pages/HomePage.js');
var loginPage = require('../Pages/LoginPage.js');


describe('Test Authorization page logging out', function() {
	it('Test Authorization page logging out', function() {
	// navigate to home page
    homePage.navigateToURL();

    //click on Log In
    console.log('Loggin in...');
    homePage.clickLoginButton();

    //enter valid email and password
    console.log('Entering email and password...');
    loginPage.logIn(testData.Constants.VALID_LOGIN,testData.Constants.VALID_PASSWORD);
    browser.sleep(testData.Timeout.LONGER_WAIT_MILI);

    //1.log out
    console.log('Logging out...');
    loginPage.clickDropdownButton();
    loginPage.clickLogoutButton();

    //verify user is back on authorization page
    expect(loginPage.getLoginButton().isDisplayed()).toBe(true,"Log in button isn`t displayed")
    });
});