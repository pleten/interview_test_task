const data_provider = require('../data_provider.js');
const homePage = require('../pages/home_page.js');
const loginPage = require('../pages/authorization_page.js');
const profilePage = require('../pages/profile_page.js');


describe('My profile', () => {
    const userEmail = data_provider.email;
    const userPassword = data_provider.password;

    let expectedName;
    let expectedEmail;
    let expectedPhone;
    let expectedAddress;
    let expectedSupportPin;


    beforeEach(function (done) {
        console.log('Authorize with valid credentials');
        homePage.goToLoginPage()
            .then(function() {
                loginPage.fillEmailField(userEmail);
                loginPage.fillPasswordField(userPassword);
                loginPage.submitForm()
                .then(function() {
                    homePage.openUserDropdownMenu();
                    homePage.navigateToUserProfile()
                        .then(function() {

                            profilePage.getName()
                                .then(function (gotName) {
                                    expectedName = gotName;
                                });

                            profilePage.getEmail()
                                .then(function (gotEmail) {
                                    expectedEmail = gotEmail;
                                });

                            profilePage.getPhone()
                                .then(function (gotPhone) {
                                    expectedPhone = gotPhone;
                                });

                            profilePage.getAddress()
                                .then(function (gotAddress) {
                                    expectedAddress = gotAddress;
                                });

                            profilePage.getSupportPin()
                                .then(function (gotSupportPin) {
                                    expectedSupportPin = gotSupportPin;
                                });
                        });
                });
                homePage.openUserDropdownMenu()
                    .then(function() {
                        homePage.performLogout();
                        done();
                    });
            });
    });

    it('Client area. TC-6', function(done) {
        console.log('Authorize with valid credentials');
        homePage.goToLoginPage()
            .then(function() {
                loginPage.fillEmailField(userEmail);
                loginPage.fillPasswordField(userPassword);
                loginPage.submitForm()
                    .then(function() {
                        homePage.openUserDropdownMenu();
                        homePage.navigateToUserProfile()
                            .then(function() {
                                profilePage.getName()
                                    .then(function (gotName) {
                                        console.log(`Verify user Name is equals to: '${expectedName}'`);
                                        expect(gotName).toEqual(expectedName,
                                            "User Name doesn`t match expected user Name");
                                    });
                                profilePage.getEmail()
                                    .then(function (gotEmail) {
                                        console.log(`Verify user Email is equals to: '${expectedEmail}'`);
                                        expect(gotEmail).toEqual(expectedEmail,
                                            "User Email doesn`t match expected user Email");
                                    });
                                console.log(`Verify user Password isn't empty`);
                                expect(profilePage.getPassword().isDisplayed()).toBe(true,
                                            "User Password is empty");
                                profilePage.getPhone()
                                    .then(function (gotPhone) {
                                        console.log(`Verify user Phone is equals to: '${expectedPhone}'`);
                                        expect(gotPhone).toEqual(expectedPhone,
                                            "User Phone doesn`t match expected user Phone");
                                    });
                                profilePage.getAddress()
                                    .then(function (gotAddress) {
                                        console.log(`Verify user Address is equals to: '${expectedAddress}'`);
                                        expect(gotAddress).toEqual(expectedAddress,
                                            "User Address doesn`t match expected user Address");
                                    });
                                profilePage.getSupportPin()
                                    .then(function (gotSupportPin) {
                                        console.log(`Verify SupportPin is equals to: '${expectedSupportPin}'`);
                                        expect(gotSupportPin).toEqual(expectedSupportPin,
                                            "User SupportPin doesn`t match expected user SupportPin");
                                    });
                                console.log(`Verify user Newsletter is ON`);
                                expect(profilePage.getNewsletter().isDisplayed()).toBe(true,
                                    "Newsletter isn't ON");
                                done();
                            });
                    });
            });
    });
});

describe('My profile', () => {
    const userEmail = data_provider.email;
    const userPassword = data_provider.password;

    let expectedSupportPin;

    beforeEach(function (done) {
        console.log('Authorize with valid credentials');
        homePage.goToLoginPage()
            .then(function () {
                loginPage.fillEmailField(userEmail);
                loginPage.fillPasswordField(userPassword);
                loginPage.submitForm();
                done();
            });
    });

    it('Refresh support pin. TC-7', function(done) {
        console.log('Authorize with valid credentials');
        homePage.openUserDropdownMenu();
        homePage.navigateToUserProfile();
        profilePage.getSupportPin()
            .then(function (gotSupportPin) {
                expectedSupportPin = gotSupportPin;
            });
        profilePage.refreshSupportPin()
            .then(function () {
                browser.waitForAngular();
                profilePage.getSupportPin()
                    .then(function (gotSupportPin) {
                        console.log(`Verify SupportPin is equals to: '${expectedSupportPin}'`);
                        expect(gotSupportPin).not.toBe(expectedSupportPin,
                            "User SupportPin doesn`t match expected user SupportPin");
                        done();
                    });
            });
    });
});