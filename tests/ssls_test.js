let assert = require('assert');
Feature('SSLS Tests');

Before((I) => {
    I.amOnPage('/');
});

Scenario('User should be able to log in and log out', function*(I,homePage,authorizationPage) {
// Scenario for Test Case 1 and Test Case 5
    let user = yield I.userCredentials('ssls.automation+5@gmail.com','123456');

    homePage.header.clickHeaderOption('Log in');
    I.seeOpenedPage('Authorization');
    I.say("I fill in 'Login' with valid credentials");
    authorizationPage.fillLoginFormAs(user);
    I.say("I check enabling password view via 'Eye' icon");
    authorizationPage.dontSeeEnabledPassword();
    authorizationPage.clickEyeIcon();
    authorizationPage.seeEnabledPassword('123456');
    I.say("I submit 'Login' form");
    authorizationPage.clickLoginBtn();
    I.say('I should be logged in');
    homePage.header.seeHeaderOption(user.email);
    homePage.header.dontSeeHeaderOption('Log in');
    I.say('I log out');
    homePage.header.clickUserMenuOption('Log out');
    I.say('I should be logged out');
    I.seeOpenedPage('Authorization');
    homePage.header.seeHeaderOption('Log in');
});


Scenario('User should see relevant error messages after attempt to login with invalid credentials', function*(I,homePage,authorizationPage) {
// Scenario for Test Case 2, Test Case 3 and Test Case 4
    let notRegisteredUser = yield I.userCredentials('test321@gmail.com', 'test321');
    let userWithInvalidEmail = yield I.userCredentials('ssls.automation+5@@gmail.com', '123456');

    homePage.header.clickHeaderOption('Log in');
    I.seeOpenedPage('Authorization');
    I.say("I submit 'Login' form with blank fields");
    authorizationPage.clickLoginBtn();
    authorizationPage.seeErrorMessageForEmail('Oops, please\nenter your email');
    authorizationPage.seeErrorMessageForPassword('Looks like you’ve\nmissed this one');
    I.say("I submit 'Login' form as not registered user");
    authorizationPage.submitLoginFormAs(notRegisteredUser);
    authorizationPage.seeFlashErrorMessage('Uh oh! Email or password is incorrect');
    I.say("I submit 'Login' form as user with invalid email");
    authorizationPage.submitLoginFormAs(userWithInvalidEmail);
    authorizationPage.seeErrorMessageForEmail('Uh oh! This\nisn’t an email');
});


Scenario('User should be able to refresh pin and check profile details', function*(I,homePage,authorizationPage,profilePage) {
// Scenario for Test Case 6 and Test Case 7
    let user = yield I.userCredentials('ssls.automation+5@gmail.com','123456');

    I.say("I log in'");
    homePage.header.clickHeaderOption('Log in');
    authorizationPage.submitLoginFormAs(user);
    homePage.header.seeHeaderOption(user.email);
    homePage.header.clickUserMenuOption('View profile');
    I.seeOpenedPage('Profile');
    I.say("I check refreshing of 'Support pin'");
    let oldSupportPin = yield* profilePage.getValueFromUserProfile('Support pin');
    profilePage.clickPinIcon();
    let newSupportPin = yield* profilePage.getValueFromUserProfile('Support pin');
    assert.equal(false, oldSupportPin === newSupportPin);
    I.say("I save all profile values");
    let userProfileInfo = yield* profilePage.getAllProfileValues();
    profilePage.header.clickUserMenuOption('Log out');
    I.seeOpenedPage('Authorization');
    authorizationPage.submitLoginFormAs(user);
    homePage.header.seeHeaderOption(user.email);
    homePage.header.clickUserMenuOption('View profile');
    I.say("I check that actual profile values are equal to saved profile values");
    let userName = yield* profilePage.getValueFromUserProfile('Name');
    assert.equal(true, userProfileInfo['name'] === userName);
    let userEmail = yield* profilePage.getValueFromUserProfile('Email');
    assert.equal(true, userProfileInfo['email'] === userEmail);
    let userPassword = yield* profilePage.getValueFromUserProfile('Password');
    assert.equal(true, userProfileInfo['password'] === userPassword);
    let userPhone = yield* profilePage.getValueFromUserProfile('Phone');
    assert.equal(true, userProfileInfo['phone'] === userPhone);
    let userAddress = yield* profilePage.getValueFromUserProfile('Address');
    assert.equal(true, userProfileInfo['address'] === userAddress);
    let userSupportPin = yield* profilePage.getValueFromUserProfile('Support pin');
    assert.equal(true, userProfileInfo['supportPin'] === userSupportPin);
    let newsletterValue = yield* profilePage.getValueOfNewsletter();
    assert.equal(true, userProfileInfo['newsletter'] === newsletterValue);
});


Scenario("User should be able to filter and sort certificates on 'Home' page", function*(I,homePage) {
// Scenario for Test Case 8

    I.say("I verify that SSL certificates sorted by 'Featured' by default");
    yield* homePage.checkSortingByFeatured();
    I.say("I verify that SSL certificates sorted by 'Cheapest' after clicked 'Cheapest' button");
    homePage.sortCertificatesBy('Cheapest');
    yield* homePage.checkSortingByCheapest();
    I.say("check that only 'Personal' certificates displayed after applying of 'Personal' filter");
    homePage.clickFilter('Personal');
    yield* homePage.checkThatOnlyPersonalCertificatesShown();
    I.say("check that only 'Multi-domain' certificates displayed after applying of 'Multi-domain' filter");
    homePage.clickFilter('multi-domain');
    yield* homePage.checkThatOnlyMultiDomainCertificatesShown();
});