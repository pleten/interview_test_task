/*Precondition:
1. Log in to the user’s account
2. Open “View profile” page
3. Save values of such fields in Profile - Name, Email, Phone, Address, Support Pin, Newsletter
4. Log out
Steps:
1. Click on triangle near the "User@email" button
2. In drop-down menu select "View profile"
Expected Result:
1. After click on "View profile" opened page "Profile" should be displayed
2. Check that opened page has to contain values in the next fields and compare with values from precondition:
2.1. Name
2.2. Email
2.3. Password (not empty)
2.4. Phone
2.5. Address
2.6. Support pin
2.7. Newsletter*/

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

    //1,2.open profile page
    console.log('Opening user profile...');
    loginPage.clickDropdownButton();
    loginPage.clickProfileButton();

    //validate profile fields values
    expect(profilePage.getPasswordField().isDisplayed()).toBe(true,"Password field isn`t displayed");

    profilePage.getNameField().getText().then(function(profileName) {
        	console.log('Profile name text = ' + profileName);
        	expect(profileName).toEqual(testData.Constants.USERNAME,
        														"Profile name text is incorrect");
        														});

    profilePage.getEmailField().getText().then(function(profileEmail) {
            console.log('Profile email text = ' + profileEmail);
            expect(profileEmail).toEqual(testData.Constants.VALID_LOGIN,
            													"Profile email text is incorrect");
            													});

    profilePage.getPhoneField().getText().then(function(profilePhone) {
            console.log('Profile phone text = ' + profilePhone);
            expect(profilePhone).toEqual(testData.Constants.PHONE,
                												"Profile phone text is incorrect");
                												});

    profilePage.getAddressField().getText().then(function(profileAddress) {
            console.log('Profile address text = ' + profileAddress);
            expect(profileAddress).toEqual(testData.Constants.ADDRESS,
                    											"Profile address text is incorrect");
                    											});

    expect(profilePage.getPinField().isDisplayed()).toBe(true,"pin field isn`t displayed");
    profilePage.getPinField().getText().then(function(profilePin) {
            console.log('Profile pin text = ' + profilePin);
                                                                });
    profilePage.getNewsletterField().getText().then(function(profileNewsletter) {
            console.log('Profile newsletter text = ' + profileNewsletter);
            expect(profileNewsletter).toEqual(testData.Constants.NEWSLETTER,
                            									"Profile newsletter text is incorrect");
                            									});

	});
});