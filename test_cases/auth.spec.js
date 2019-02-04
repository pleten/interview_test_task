//

let LoginPage = require('./loginPage.pageObject');
const protractor = require("protractor");

describe("Authentication test scenarios", function() {

    let loginPage = new LoginPage();
    let until = protractor.ExpectedConditions;
    let homePage = element(by.css('.page-container.cert-list-page'));
    let correct_email = browser.params.login.email;
    let correct_password = browser.params.login.password;
    let nonExistingUser_email = 'test12345@test.com';
    let incorrect_email = 'test12345@@test.com';
    let incorrect_password = 'BlaBlaBla';

    it('home page should be opened',function() {
        browser.get('/');
        expect(homePage.isDisplayed()).toBe(true);
    });

    it('successful login is passed', function() {
        loginPage.openLoginPage();
        loginPage.login(correct_email,correct_password);
        expect(loginPage.userPageButton.isPresent()).toBe(true);
    });

    it('logout completed', function() {
        loginPage.logout();
    });

    it('login with non-existing user is failed', function() {
        loginPage.openLoginPage();
        loginPage.login(nonExistingUser_email,incorrect_password);
        browser.wait(until.textToBePresentInElement(loginPage.incorectEmailOrPass_errorMessage,'Uh oh! Email or password is incorrect'), 5 * 1000, 'Error pop-up has no text.');
    });

    it('login with invalid email is failed', function() {
        loginPage.openLoginPage();
        loginPage.login(incorrect_email,incorrect_password);
        browser.wait(until.visibilityOf(loginPage.invalidEmail_errorMessage), 5 * 1000, 'Error tooltip not appeared.');
    });

    it('login with empty fields cased to error tooltips', function() {
        loginPage.openLoginPage();
        loginPage.login("","");
        browser.wait(until.and(
            until.visibilityOf(loginPage.emptyInputs_errorMessages.get(0)),
            until.visibilityOf(loginPage.emptyInputs_errorMessages.get(1))
        ), 5 * 1000, 'Error tooltips not appeared.');

    });
});