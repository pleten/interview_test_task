/**
 * Created by vbu on 2/15/17.
 */
var AutorizePage = require('../pages/authorize.po'),
    HomePage = require('../pages/homepage.po'),
    ProfilePage = require('../pages/profile.po'),
    messages = require('../utils/messages'),
    chance = require('chance').Chance();

describe('Authorize page', function () {
    var authorize = new AutorizePage();
    var home = new HomePage();
    var logged;

    beforeEach(function () {
        logged = false;
        authorize.open();
    });

    afterEach(function () {
        if (logged) {
            home.dropdown().logout();
        }
    });

    it('should successfully login with existing user', function () {
        helpers.clearAndSetValue(authorize.email, browser.params.email);
        helpers.clearAndSetValue(authorize.password, browser.params.password);
        // show password
        authorize.showPassword.click();
        // password is displayed
        expect(authorize.password).toHaveValue(browser.params.password);

        // hide password
        authorize.showPassword.click();

        expect(authorize.password.getAttribute('type')).toEqual('password', 'Password type after hide');

        authorize.submit.click();

        // check home page is open
        browser.wait(EC.textToBePresentInElement(home.userButton, browser.params.email), BROWSER_WAIT, 'Waiting for login')
            .then(function () {
                console.log('Successfully logged in ssls');
                logged = true;
            });

        expect($('.cert-list-page')).toBeDisplayed();

    });

    it('should not login with not registered user', function () {
        // generate random user
        var randomUser = {
            email: chance.email(),
            password: chance.string()
        };

        authorize.loginAs(randomUser.email, randomUser.password);

        browser.wait(EC.visibilityOf(authorize.notification), BROWSER_WAIT).then(function () {
           expect(authorize.notification).toHaveText('Uh oh! Email or password is incorrect');
        });
    });

    it('should show error on incorrect email', function () {
        var incorrectMails = ['test@@test.com', 'test@test.', '@test.com', 'test@test@test.com'];

        incorrectMails.forEach(function (email) {
            authorize.loginAs(email, browser.params.password);
            expect(authorize.email).toBeInvalid();
            expect(authorize.leftErrorBox(messages.WRONG_EMAIL)).toBeDisplayed();
        })
    });

    it('should show errors on empty fields', function () {

        authorize.loginAs('', '');

        expect(authorize.email).toBeInvalidRequired();
        expect(authorize.leftErrorBox(messages.EMPTY_EMAIL)).toBeDisplayed();
        expect(authorize.password).toBeInvalidRequired();
        expect(authorize.leftErrorBox(messages.EMPTY_PASSWORD)).toBeDisplayed();
    });

    it('should logout', function () {
        authorize.loginAs(browser.params.email, browser.params.password);

        home.dropdown().logout();

        expect(browser.getCurrentUrl()).toMatch(/\/authorize/, 'Url after logout');
    });
    
});