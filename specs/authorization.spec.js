var AuthorizationPage = require('../page-objects/authorization.page'),
    HomePage = require('../page-objects/home.page');

describe('Authorization Page -', function() {
    var home = new HomePage(),
        auth = new AuthorizationPage(),
        users = browser.params.users,
        data = browser.params.data;

    beforeEach(function() {
        home.go().loginLink.click();
    });

    it('Welcome Back!', function() {
        expect(auth.authContainer.isDisplayed()).toBeTruthy();
        auth.login(users.registered);
        expect(home.certificateList.isDisplayed()).toBeTruthy();
        expect(home.profileBtn.getText()).toEqual(users.registered.email);
    });

    it('Not Registered User', function() {
        auth.login(users.unregistered);
        expect(auth.errorMessage.getText()).toEqual(data.errors.incorrectEmail);
    });

    it('Invalid Email', function() {
        auth.login(users.invalidEmail);
        expect(auth.tooltipMessage.getText()).toEqual(data.errors.invalidEmail);
    });

    it('Empty Fields', function() {
        auth.login(users.emptyFields);
        expect(auth.emptyEmailError.getText()).toEqual(data.errors.emptyEmail);
        expect(auth.emptyPasswordError.getText()).toEqual(data.errors.emptyPassword);
    });

    it('Log Out', function() {
        auth.login(users.registered);
        home.logout();
        expect(home.loginLink.isDisplayed()).toBeTruthy();
        expect(auth.authContainer.isDisplayed()).toBeTruthy();
    });
});
