var AuthorizationPage = require('../page-objects/authorization.page'),
    HomePage = require('../page-objects/home.page'),
    Profile = require('../page-objects/profile.page');

describe('My Profile -', function() {
    var profile = new Profile(),
        home = new HomePage(),
        auth = new AuthorizationPage();

    var users = browser.params.users,
        data = browser.params.data;

    beforeEach(function() {
        home.go().loginLink.click();
        auth.login(users.registered);
        home.viewProfile();
    });

    it('Client Area', function() {
        var profileData;

        browser.controlFlow().execute(function() {
            expect(profile.form.isDisplayed()).toBeTruthy();
            profile.getData().then(function(data) {
                profileData = data;
            })
            home.logout();
            auth.login(users.registered);
            home.viewProfile();
        }).then(function() {
            profile.verifyData(profileData);
        })
    });

    it('Refresh Support Pin', function() {
        var oldPin;
        var filterCriterion = "Support pin";

        profile.getData(filterCriterion).then(function(data) {
            oldPin = data;
        }).then(function() {
            profile.supportPinRefreshBtn.click();
        }).then(function() {
            profile.getData(filterCriterion).then(function(newPin) {
                expect(oldPin[filterCriterion]).not.toEqual(newPin[filterCriterion]);
            })
        })
    })
});

