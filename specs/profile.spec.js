/**
 * Created by vbu on 2/16/17.
 */

var HomePage = require('../pages/homepage.po'),
    ProfilePage = require('../pages/profile.po');

describe('Profile page', function () {
    var home = new HomePage();
    var profile = new ProfilePage();

    beforeEach(function () {
        home.loginIfNeeded(browser.params.email, browser.params.password);
        home.openProfile()
    });

    afterAll(function () {
        home.dropdown().logout();
    });

    it('should show client area with not empty fields', function () {
        expect(profile.items.count()).toBe(7, 'Profile items');

        expect(profile.itemDesc('Name')).toHaveText('Vasya Pupkin');
        expect(profile.itemDesc('Email')).toHaveText(browser.params.email);
        expect(profile.itemDesc('Password')).toHaveText('*****');
        expect(profile.itemDesc('Phone')).toHaveText('+380 57123456789');
        expect(profile.itemDesc('Address')).toHaveText('Diagon alley 2, Misto, Uryupinsk 612120, Ukraine');
        expect(profile.pinDesc.getText()).toBeSameLengthAs('aaaa');
        expect(profile.itemDesc('Newsletter').element(by.name('newsletterOn'))).toBeChecked();
    });

    it('should update pin', function () {
        // change and wait for changing
        profile.updatePin();
        // check that new pin is not empty and 4-digit string
        expect(profile.pinDesc.getText()).toBeSameLengthAs('aaaa');
    });


});
