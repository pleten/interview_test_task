const data_provider = require('../data_provider.js');
const homePage = require('../pages/home_page.js');
const loginPage = require('../pages/authorization_page.js');


describe('Authorization', () => {
    const expectedMessageForNotRegisteredEmail = data_provider.not_registered_email_message_text;
    const expectedMessageForInvalidEmail = data_provider.invalid_email_message_text;
    const expectedMessageForEmptyEmail = data_provider.empty_email_field_message_text;
    const expectedMessageForEmptyPassword = data_provider.empty_password_field_message_text;
    const invalidEmail = data_provider.invalid_email;
    const notRegisteredEmail = data_provider.not_registered_email;
    const userEmail = data_provider.email;
    const userPassword = data_provider.password;


    it('Welcome back! TC-1', function(done) {
        console.log('Authorize with valid credentials');
        homePage.goToLoginPage();
        loginPage.fillEmailField(userEmail);
        loginPage.fillPasswordField(userPassword);
        loginPage.submitForm();
        homePage.getUserCertificatesButtonText().then(function(certificateButtonText) {
            console.log(`Verify certificate button text is '${certificateButtonText}'`);
            expect(certificateButtonText).toEqual(userEmail,
                "Certificate button text doesn`t match user email");
            homePage.openUserDropdownMenu();
            console.log('Verify Dropdown menu is displayed');
            expect(homePage.getUserDropdownMenuContainer().isDisplayed()).toBe(true,"Dropdown container isn`t displayed")
        });
        done();
    });

    it('Not registered user. TC-2', function(done) {
        console.log('Authorize with not registered email');
        homePage.goToLoginPage();
        loginPage.fillEmailField(notRegisteredEmail);
        loginPage.fillPasswordField(userPassword);
        loginPage.submitForm();
        loginPage.getNotRegisteredUserInfoMessageText().then(function(infoMessageText) {
            console.log(`Verify info message text equals to: \n'${expectedMessageForNotRegisteredEmail}'`);
            expect(infoMessageText).toEqual(expectedMessageForNotRegisteredEmail,
                `Unexpected error message: \n'${infoMessageText}'`);
        });
        done();
    });

    it('Invalid email. TC-3', function(done) {
        console.log('Authorize with invalid email');
        homePage.goToLoginPage();
        loginPage.fillEmailField(invalidEmail);
        loginPage.fillPasswordField(userPassword);
        loginPage.submitForm();
        loginPage.getEmailErrorMessageText().then(function(errorMessageText) {
            console.log(`Verify info message text equals to: \n'${expectedMessageForInvalidEmail}'`);
            expect(errorMessageText).toEqual(expectedMessageForInvalidEmail,
                `Unexpected error message: \n'${errorMessageText}'`);
        });
        done();
    });

    it('Empty fields. TC-4', function(done) {
        console.log('Authorize with email and password fields');
        homePage.goToLoginPage();
        loginPage.submitForm();
        loginPage.getEmailErrorMessageText().then(function(emailErrorMessageText) {
            console.log(`Verify info message text equals to: \n'${expectedMessageForEmptyEmail}'`);
            expect(emailErrorMessageText).toEqual(expectedMessageForEmptyEmail,
                `Unexpected error message: \n'${emailErrorMessageText}'`);
        });
        loginPage.getPasswordErrorMessageText().then(function(passwordErrorMessageText) {
            console.log(`Verify info message text equals to: \n'${expectedMessageForEmptyPassword}'`);
            expect(passwordErrorMessageText).toEqual(expectedMessageForEmptyPassword,
                `Unexpected error message: \n'${passwordErrorMessageText}'`);
        });
        done();
    });
});