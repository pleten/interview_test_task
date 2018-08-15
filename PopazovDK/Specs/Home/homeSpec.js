describe("Home page  Tests  -----> ", function () {

    let homePage = require('../../Pages/homePage.js');
    let login = browser.params.testUserLogin;
    let password = browser.params.testUserPassword;
    let wrongEmail = "notExisted@email.com";
    let invalidEmail = "test@@test.com";
    let wrongPassword = "lalalaTratata";
    let incorrectCredentialsMessage = "Uh oh! Email or password is incorrect";
    let invalidEmailMessage = "Uh oh! This isn’t an email";
    let emptyEmailMessage = "Oops, please enter your email";
    let emptyPasswordMessage = "Looks like you’ve missed this one";

    beforeEach(function () {
        homePage.get();
    });

    afterEach(function () {
        homePage.logOut();
    });

    it("Test Case - 1 Welcome back!", () => {
        homePage.fillCredential(login, password);
        homePage.validateShowPasswordButton(password);
        homePage.submitButton.click();
        homePage.validateUserLoggedIn(login);
    });

    it("Test Case - 2 Not registered user", () => {
        homePage.fillCredential(wrongEmail, wrongPassword);
        homePage.validateShowPasswordButton(wrongPassword);
        homePage.submitButton.click();
        homePage.validateErrorMessage(incorrectCredentialsMessage)
    });

    it("Test Case - 3 Invalid email", () => {
        homePage.fillCredential(invalidEmail, password);
        homePage.validateShowPasswordButton(password);
        homePage.submitButton.click();
        homePage.validateValidationMessage(homePage.emailValidationMessage, invalidEmailMessage)
    });

    it("Test Case - 4 Empty fields", () => {
        homePage.loginButton.click();
        homePage.submitButton.click();
        homePage.validateValidationMessage(homePage.emailValidationMessage, emptyEmailMessage);
        homePage.validateValidationMessage(homePage.passwordValidationMessage, emptyPasswordMessage)
    });

    it("Test Case - 5 Log Out", () => {
        homePage.logIn(login, password);
        homePage.logOut();
    });

    it("Test Case - 8  Filters", () => {
        homePage.logIn(login, password);
        expect(homePage.sortCertificatesButton.getText()).toBe("CHEAPEST", "Wrong text on sorting button");
        homePage.validateCertificatesOrderedByRate(); //should fail here, certificates not sorted by rating correctly
        homePage.clickFilterByText("Personal");
        expect(homePage.certificates.count()).toBe(5);
        homePage.clickFilterByText("multi-domain");
        expect(homePage.certificates.count()).toBe(1);
        homePage.clickFilterByText("Personal");
        homePage.clickFilterByText("multi-domain");
        homePage.clickSortButton();
        expect(homePage.sortCertificatesButton.getText()).toBe("FEATURED", "Wrong text on sorting button");
        homePage.validateCertificatesOrderedByPrice();
    });


});