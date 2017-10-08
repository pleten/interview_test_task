var HomePage = require('./page-objects/home.page');
var AuthorizationPage = require('./page-objects/authorization.page');
var Helper = require('./helper');

describe('Authorization Page', function() {
    var home = new HomePage();
    var auth = new AuthorizationPage();
    var helper = new Helper();
    var users = browser.params.users;
    var data = browser.params.data;

    beforeEach(function() {
        home.go();
        home.loginLink.click();
    });

    afterEach(function() {
        browser.manage().deleteAllCookies();
    })

    it('Welcome Back!', function() {
        expect(home.certificateList.isDisplayed()).toBeTruthy();
        auth.login(user);
        expect(home.certificateList.isDisplayed()).toBeTruthy();
        home.profileBtn.getText().then(function(txt) {
            expect(txt).toEqual(users.registered.email);
        });
    });

    it('Not Registered User', function() {
        auth.login(user);
        helper.wait_for_element(auth.errorMessage);
        auth.errorMessage.getText().then(function(txt) {
            expect(txt).toEqual(data.errors.incorrectEmail);
        });
    });

    it('Invalid Email', function() {
        auth.login(user);
        auth.tooltipMessage.getText().then(function(txt) {
            expect(txt).toEqual(data.errors.invalidEmail);
        });
    });

    it('Empty Fields', function() {
        auth.loginBtn.click();
        auth.emptyEmailError.getText().then(function(txt) {
            expect(txt).toEqual(data.errors.emptyEmail);
        });
        auth.emptyPasswordError.getText().then(function(txt) {
            expect(txt).toEqual(data.errors.emptyPassword);
        });
    });

    it('Log Out', function() {
        auth.login(user);
        home.logout();
        expect(home.loginLink.isDisplayed()).toBeTruthy();
        expect(browser.getCurrentUrl()).toEqual(data.url.authorize);
    });

});
