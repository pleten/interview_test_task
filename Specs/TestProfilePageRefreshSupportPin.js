/*Precondition:
1. User has to be logged in
Steps:
1. Click on triangle near the "User@email" button
2. In drop-down menu select "View profile"
3. Click "Update" button in “support pin field” to re-generation a new support pin
Expected Result:
1. After click on “Update” button, support pin should be updated.*/

var testData = require('../Data/TestConstants.js');
var homePage = require('../Pages/HomePage.js');
var loginPage = require('../Pages/LoginPage.js');
var profilePage = require('../Pages/ProfilePage.js');

describe('Test Profile page', function() {
	it('Test Profile Page', function() {
	// navigate to home page
    homePage.navigateToURL();

    //click on Log In
    console.log('Loggin in...');
    homePage.clickLoginButton();

    //enter valid email and password
    console.log('Entering email and password...');
    loginPage.logIn(testData.Constants.VALID_LOGIN,testData.Constants.VALID_PASSWORD);
    browser.sleep(testData.Timeout.LONGER_WAIT_MILI);

    //1.2 open profile page
    console.log('Opening user profile...');
    loginPage.clickDropdownButton();
    loginPage.clickProfileButton();

    //3. refresh support pin
    profilePage.getPinField().getText().then(function(pinBefore) {
                console.log('Pin before refreshing = ' + pinBefore);
                profilePage.clickRefreshPin();
                browser.sleep(testData.Timeout.SHORT_WAIT_MILI);

    //Assert pin is refreshed
                profilePage.getPinField().getText().then(function(pinAfter) {
                console.log('Pin after refreshing = ' + pinAfter);
                expect(pinBefore).not.toEqual(pinAfter,
                    								"Pin isn`t refreshed");
                    												});
                    												});

    });
});