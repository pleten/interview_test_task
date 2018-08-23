describe('Automation Test', function() {

    let indexPage = require('./pages/index');
    let authorizationPage = require('./pages/authorization');
    let profilePage = require('./pages/profilePage');

    beforeEach(function() {
        browser.get('https://ssls.com/');
    });

    afterEach(function() {
        browser.executeScript('window.localStorage.clear();');
        browser.executeScript('window.sessionStorage.clear();');
        browser.driver.manage().deleteAllCookies();
    });

    it('user should be able to login', function() {

        const email = 'ssls.automation+5@gmail.com';
        const password = '123456';

        expect(browser.getCurrentUrl()).toEqual('https://www.ssls.com/');

        indexPage.clickLoginBtn();
        expect(authorizationPage.getTitle()).toEqual('Authorization');
        expect(browser.getCurrentUrl()).toEqual('https://www.ssls.com/authorize');

        authorizationPage.fillEmailField(email);
        authorizationPage.fillPassword(password);
        authorizationPage.clickEyeIcon();
        expect(authorizationPage.getPasswordAttribute()).toEqual("text");

        authorizationPage.clickLoginBtn();
        expect(indexPage.getUserEmailBtn().getText()).toEqual(email);
        expect(indexPage.getUserMenuDropDown().isPresent()).toBe(true);

    });

    it('user should not be able to login using invalid credentials', function() {

        const email = 'invalidemail@gmail.com';
        const password = '111111';

        expect(browser.getCurrentUrl()).toEqual('https://www.ssls.com/');

        indexPage.clickLoginBtn();
        expect(authorizationPage.getTitle().getText()).toEqual('Authorization');
        expect(browser.getCurrentUrl()).toEqual('https://www.ssls.com/authorize');

        authorizationPage.fillEmailField(email);
        authorizationPage.fillPassword(password);
        authorizationPage.clickEyeIcon();
        expect(authorizationPage.getPasswordAttribute()).toEqual("text");

        authorizationPage.clickLoginBtn();
        authorizationPage.waitNotification();
        expect(authorizationPage.getNotification().getText()).toEqual('Uh oh! Email or password is incorrect');

    });

    it('user should not be able to login using invalid email', function() {

        const email = 'invalidemail.com';
        const password = '123456';

        expect(browser.getCurrentUrl()).toEqual('https://www.ssls.com/');

        indexPage.clickLoginBtn();
        expect(authorizationPage.getTitle().getText()).toEqual('Authorization');
        expect(browser.getCurrentUrl()).toEqual('https://www.ssls.com/authorize');

        authorizationPage.fillEmailField(email);
        authorizationPage.fillPassword(password);
        authorizationPage.clickEyeIcon();
        expect(authorizationPage.getPasswordAttribute()).toEqual("text");

        authorizationPage.clickLoginBtn();
        expect(authorizationPage.getInvalidEmailError()).toEqual('Uh oh! This\n' +
            'isn’t an email');

    });

    it('user should not be able to login with empty fields', function() {

        const email = ' ';
        const password = ' ';

        expect(browser.getCurrentUrl()).toEqual('https://www.ssls.com/');

        indexPage.clickLoginBtn();
        expect(authorizationPage.getTitle().getText()).toEqual('Authorization');
        expect(browser.getCurrentUrl()).toEqual('https://www.ssls.com/authorize');

        authorizationPage.fillEmailField(email);
        authorizationPage.fillPassword(password);
        authorizationPage.clickLoginBtn();
        expect(authorizationPage.getEmptyEmailError()).toEqual('Oops, please\n' +
            'enter your email');
        expect(authorizationPage.getEmptyPasswordError()).toEqual('Looks like you’ve\n' +
            'missed this one');

    });

    it('user should be able to logout', function() {

        const email = 'ssls.automation+5@gmail.com';
        const password = '123456';

        //login
        indexPage.clickLoginBtn();
        authorizationPage.fillEmailField(email);
        authorizationPage.fillPassword(password);
        authorizationPage.clickLoginBtn();

        //logout
        indexPage.logout();
        expect(authorizationPage.getTitle()).toEqual('Authorization');
        expect(browser.getCurrentUrl()).toEqual('https://www.ssls.com/authorize');

    });

    it('user should be able to logout and check profile details', async function () {

        const email = 'ssls.automation+5@gmail.com';
        const password = '123456';

        indexPage.clickLoginBtn();
        authorizationPage.submitLoginFormAs(email, password);
        indexPage.openProfilePage();
        expect(profilePage.getPageTitle()).toEqual('Profile');
        let currentName = await profilePage.getValueFromProfile('name');
        let currentEmail = await profilePage.getValueFromProfile('email');
        let currentPassword = await profilePage.getValueFromProfile('password');
        let currentPhone = await profilePage.getValueFromProfile('phone');
        let currentAddress = await profilePage.getValueFromProfile('address');
        let currentPin = await profilePage.getValueFromProfile('pin');
        let currentNewsletter = await profilePage.getValueOfNewsletter();
        indexPage.logout();
        authorizationPage.submitLoginFormAs(email, password);
        indexPage.openProfilePage();
        expect(profilePage.getValueFromProfile('name')).toEqual(currentName);
        expect(profilePage.getValueFromProfile('email')).toEqual(currentEmail);
        expect(profilePage.getValueFromProfile('password')).toEqual(currentPassword);
        expect(profilePage.getValueFromProfile('phone')).toEqual(currentPhone);
        expect(profilePage.getValueFromProfile('address')).toEqual(currentAddress);
        expect(profilePage.getValueFromProfile('pin')).toEqual(currentPin);
        expect(profilePage.getValueOfNewsletter()).toEqual(currentNewsletter);
    });

    it('user should be able to update support pin on profile page', async function () {

        const email = 'ssls.automation+5@gmail.com';
        const password = '123456';

        indexPage.clickLoginBtn();
        authorizationPage.submitLoginFormAs(email, password);
        indexPage.openProfilePage();
        expect(profilePage.getPageTitle()).toEqual('Profile');
        let oldSupp = profilePage.getValueFromProfile('pin');
        profilePage.clickPinIcon();
        let lastSupp = profilePage.getValueFromProfile('pin');
        expect(oldSupp).not.toEqual(lastSupp);
    });

    it('user should be able to check sorting and filters of certificates on Home page', function () {

        const personalList = [ 'PositiveSSL',
            'EssentialSSL',
            'PositiveSSL Wildcard',
            'PositiveSSL Multi-Domain',
            'EssentialSSL Wildcard' ];

        indexPage.checkSortingByFeatured();

        indexPage.clickFilterBtn('Personal');
        indexPage.checkPersonalFilter(personalList);

        indexPage.clickFilterBtn('multi-domain');
        indexPage.checkMultiDomainFilter();

        indexPage.sortCertificatesBy('Cheapest');
        indexPage.checkSortingByPrices();

    });
});