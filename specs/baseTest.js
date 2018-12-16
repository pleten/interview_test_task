const LoginPage = require('../common/pages/login_page.js');
const MainPage = require('../common/pages/main_page.js');
const ProfilePage = require('../common/pages/profile_page.js');
const connections = require('../connections.json');
const loginHelper = require('../common/helpers/loginHelp.js');
const navHelper = require('../common/helpers/navigationHelper.js');
const EC = protractor.ExpectedConditions;

fdescribe('Test task', () => {

    const mainPage = new MainPage();
    const loginPage = new LoginPage();
    const profilePage = new ProfilePage();

    beforeEach(async () => {
        await mainPage.open();
    });

    afterEach(async () => {
        await loginHelper.logout();
    });

    it('1. Authorization page (Welcome back!)', async () => {

        await mainPage.loginButton.click();
        await browser.wait(EC.elementToBeClickable(loginPage.nameField), 10000);
        await loginPage.nameField.sendKeys(connections.credentials.admin.login);
        await loginPage.passwordField.sendKeys(connections.credentials.admin.password);
        await loginPage.eyeButton.click();

        expect(loginPage.passwordField.getAttribute('type')).toEqual('text', 'password is not shown after eye button click');

        await loginPage.submitLoginButton.click();

        expect(browser.getCurrentUrl()).toEqual('https://www.ssls.com/', 'Did not switched to the main page');
        expect(mainPage.userButton.getText()).toEqual('ssls.automation+5@gmail.com', 'User name is not presented on the login button');
        expect(mainPage.userMenu.userDropDownButton.isPresent()).toBe(true, 'DropDown is not presented');

    });

    it('2. Authorization page. Not registered user', async () => {

        await browser.wait(EC.elementToBeClickable(mainPage.loginButton), 10000);
        await mainPage.loginButton.click();
        await browser.wait(EC.elementToBeClickable(loginPage.nameField), 10000);
        await loginPage.nameField.sendKeys('invalid@password.com');
        await loginPage.passwordField.sendKeys(connections.credentials.admin.password);
        await loginPage.eyeButton.click();

        expect(loginPage.passwordField.getAttribute('type')).toEqual('text', 'password is not shown after eye button click');

        await loginPage.submitLoginButton.click();

        expect(browser.getCurrentUrl()).toEqual('https://www.ssls.com/authorize', 'Did not switched to the main page');

        browser.wait(EC.presenceOf(loginPage.alert), 2000);
        expect(loginPage.alert.isPresent()).toBe(true, 'alert is not present');
        expect(loginPage.alert.getText()).toEqual('Uh oh! Email or password is incorrect', 'Warning message is not correct');

    });

    it('3. Authorization page. Invalid email', async () => {

        await mainPage.loginButton.click();
        await browser.wait(EC.elementToBeClickable(loginPage.nameField), 10000);
        await loginPage.nameField.sendKeys('ssls.automation+5@@gmail.com');
        await loginPage.passwordField.sendKeys(connections.credentials.admin.password);
        await loginPage.eyeButton.click();

        expect(loginPage.passwordField.getAttribute('type')).toEqual('text', 'password is not shown after eye button click');

        await loginPage.submitLoginButton.click();

        expect(loginPage.warning.isPresent()).toBe(true, 'alert is not present');
        expect(loginPage.warning.getText()).toEqual('Uh oh! This\n' +
            'isn’t an email', 'Warning message is not correct');

    });

    it('4. Authorization page. Empty fields', async () => {

        await mainPage.loginButton.click();
        await browser.wait(EC.elementToBeClickable(loginPage.nameField), 10000);
        await loginPage.submitLoginButton.click();
        expect(browser.getCurrentUrl()).toEqual('https://www.ssls.com/authorize', 'Did not switched to the main page');

        expect(loginPage.emailWarning.getText()).toEqual('Oops, please\n' +
            'enter your email', 'Warning message or email is not correct');

        expect(loginPage.passwordWarning.isPresent()).toBe(true, 'alert is not present');
        expect(loginPage.passwordWarning.getText()).toEqual('Looks like you’ve\n' +
            'missed this one', 'Warning message is not correct');

    });


    it('5. Log Out.', async () => {

        await loginHelper.login();
        await loginHelper.logout();
        expect(browser.getCurrentUrl()).toEqual('https://www.ssls.com/authorize', 'Page was not switched after logout');

    });

    it('6. My profile page. Client area', async () => {


        await loginHelper.login();
        await navHelper.goToUserProfile();

        /**
         * Edit each field in profile menu
         */
        const userName = await profilePage.getAndSaveName();
        const emailValue = await profilePage.getAndSaveEmail();
        await profilePage.openAndSavePassword();
        const phoneValue = await profilePage.getAndSavePhone();
        const addressValue = await profilePage.getAndSaveAddress();
        const pinValue = await profilePage.getSupportPinValue();
        const newslettersToggleState = await profilePage.getNewslettersToggleState();

        //Verify after re-login
        await loginHelper.logout();
        await loginHelper.login();
        await navHelper.goToUserProfile();
        expect(profilePage.getUserName()).toEqual(userName, 'email is not saved');
        expect(profilePage.getEmail()).toEqual(emailValue, 'email is not saved');
        expect(profilePage.getPassword()).not.toBe(null, 'email is not saved');
        expect(profilePage.getPhone()).toEqual(phoneValue, 'email is not saved');
        expect(profilePage.getAddress()).toEqual(addressValue, 'email is not saved');
        expect(profilePage.getSupportPinValue()).toEqual(pinValue, 'email is not saved');
        expect(profilePage.getNewslettersToggleState()).toEqual(newslettersToggleState, 'email is not saved');

    });

    it('7. My profile page. Refresh support pin', async () => {
        'use strict';
        await loginHelper.login();
        await navHelper.goToUserProfile();
        const valueBefore = await profilePage.getSupportPinValue();
        await profilePage.supportPinUpdateButton.click();
        expect(profilePage.getSupportPinValue()).not.toEqual(valueBefore, 'New value was not generated');
    });

    it('8. Home page. Filters', async () => {

        async function asyncForEach(array, callback) {
            for (let index = 0; index < array.length; index++) {
                await callback(array[index], index, array);
            }
        }

        function isSortedAscending(array) {
            let result = false;
            for (let i = 0; i < array.length; i++) {
                if (array[i] <= array[i + 1]) {
                    result = true;
                } else if (array[i] > array[i + 1]) {
                    result = false;
                    break;
                }
            }
            return result;
        }

        function isSortedDescending(array) {
            let result = false;
            for (let i = 0; i < array.length; i++) {
                if (array[i] >= array[i + 1]) {
                    result = true;
                } else if (array[i] > array[i + 1]) {
                    result = false;
                    break;
                }
            }
            return result;
        }

        await loginHelper.login();
        const personalButton = await element(by.cssContainingText('.btn', 'Personal'));
        const multiDomainButton = await element(by.cssContainingText('.btn', 'multi-domain'));

        browser.wait(EC.elementToBeClickable(personalButton), 4000);
        await personalButton.click();

        //Personal SSLs filter
        const result = await $$('.ssl-content');
        result.forEach(async item => {
            expect(item.getText()).toContain('Domain validation', 'SSL item is not containing Domain validation option');
            expect(item.getText()).not.toContain('Organization validation', 'SSL item is not containing Domain validation option');
            expect(item.getText()).not.toContain('EV (greenbar)', 'SSL item is not containing Domain validation option');
        });
        expect(result.length).toBe(5);

        //Multi-Domain SSL filter
        await multiDomainButton.click();
        await $$('.ssl-item.dv-item.col-4').then(results => {
            expect(results.length).toBe(1);
            results.forEach(async item => {
                expect(item.getText()).toContain('Multi-Domain', 'Multi-Domain filter is not working');
                expect(item.getText()).toContain('Domain validation', 'SSL item is not containing Domain validation option');
                expect(item.getText()).not.toContain('Organization validation', 'SSL item is not containing Domain validation option');
                expect(item.getText()).not.toContain('EV (greenbar)', 'SSL item is not containing Domain validation option');
            });
        });

        // Featured sorting
        await multiDomainButton.click();
        await personalButton.click();
        // const featuredSortButton = await element(by.cssContainingText('a', 'Featured'));
        // await featuredSortButton.click();
        const featureSortResult = await $$('.ssl-name.ng-binding~div.rating');
        await browser.executeScript('arguments[0].scrollIntoView(true)', featureSortResult[4]);
        expect(featureSortResult.length).toBe(13, 'Some SSL item are missed');
        let arrayOfRatings = [];
        await asyncForEach(featureSortResult, async item => {
            const ratingString = await item.getAttribute('class');
            const rateInt = ratingString.replace(/[^\d.]/g, '');
            arrayOfRatings.push(rateInt);
        });
        expect(isSortedDescending(arrayOfRatings)).toBe(true, 'Featured sort is not working correctly');

        // Cheapest sorting
        const cheapestButton = await element(by.cssContainingText('a', 'Cheapest'));
        await cheapestButton.click();
        const featuredElement = await element(by.cssContainingText('a', 'Featured'));
        expect(featuredElement.isDisplayed()).toBe(true, 'Button switched to Featured sort');
        let arrayOfPrices = [];
        const sslItems = await $$('.ssl-content');
        expect(sslItems.length).toBe(13, 'Some SSL item are missed');
        await asyncForEach(sslItems, async item => {
            const price = await item.$('.ssl-price-box>price:first-child').getAttribute('value');
            arrayOfPrices.push(parseInt(price));
        });
        expect(isSortedAscending(arrayOfPrices)).toBe(true, 'Price sort is not working correctly');
    });
});
