const data_provider = require('../data_provider.js');
const homePage = require('../pages/home_page.js');
const loginPage = require('../pages/authorization_page.js');


describe('Authorization', () => {
    const userEmail = data_provider.email;
    const userPassword = data_provider.password;

    describe('Preconditions', () => {
        beforeEach(function (done) {
            console.log('Authorize with valid credentials');
            homePage.goToLoginPage();
            loginPage.fillEmailField(userEmail);
            loginPage.fillPasswordField(userPassword);
            loginPage.submitForm();
            done();
        });

        it('Log Out. TC-5', function(done) {
            console.log('Perform logout');
            homePage.openUserDropdownMenu();
            homePage.performLogout();
            expect(homePage.isLoginNavigationLinkDisplayed()).toBe(true,"Log in button isn`t displayed");
            done();
        });
    });
});