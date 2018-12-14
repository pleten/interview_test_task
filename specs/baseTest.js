const loginPage = require('../common/pages/login_page.js');
const mainPage = require('../common/pages/main_page.js');
const connections = require('../connections.json');
const loginHelper = require('../common/helpers/loginHelp.js');
const navHelper = require('../common/helpers/navigationHelper.js');
const EC = protractor.ExpectedConditions;

describe('Test task', () => {

    const loginPage = new loginPage();

    beforeEach(async () => {
        await browser.get('https://ssls.com');
        console.log('go to url');
    });

    afterEach(async () => {
        await loginHelper.logout();
        await browser.refresh();

    });

    it('1. Authorization page (Welcome back!)', async () => {

        await loginPage.loginButton.click();
        await loginPage.nameField.sendKeys(connections.credentials.admin.login);
        await loginPage.passwordField.sendKeys(connections.credentials.admin.password);
        await loginPage.eyeButton.click();

        expect(loginPage.passwordField.getAttribute('type')).toEqual('text', 'password is not shown after eye button click');

        await loginPage.submit.click();

        expect(browser.getCurrentUrl()).toEqual('https://www.ssls.com/', 'Did not switched to the main page')
        expect(loginPage.userButton.getText()).toEqual('ssls.automation+5@gmail.com', 'User name is not presented on the login button')
        expect($('.dropdown-btn').isPresent()).toBe(true, 'Dropdown is not presented');

    });

    it('2. Authorization page. Not registered user', async () => {

        browser.wait(EC.elementToBeClickable(loginPage.loginButton), 3000);
        await loginPage.loginButton.click();
        await loginPage.nameField.sendKeys('invalid@password.com');
        await loginPage.passwordField.sendKeys(connections.credentials.admin.password);
        await loginPage.eyeButton.click();

        expect(loginPage.passwordField.getAttribute('type')).toEqual('text', 'password is not shown after eye button click');

        await loginPage.submit.click();

        expect(browser.getCurrentUrl()).toEqual('https://www.ssls.com/authorize', 'Did not switched to the main page');

        browser.wait(EC.presenceOf(loginPage.alert), 2000);
        expect(loginPage.alert.isPresent()).toBe(true, 'alert is not present');
        expect(loginPage.alert.getText()).toEqual('Uh oh! Email or password is incorrect', 'Warning message is not correct');

    });

    it('3. Authorization page. Invalid email', async () => {

        await loginPage.loginButton.click();
        await loginPage.nameField.sendKeys('ssls.automation+5@@gmail.com');
        await loginPage.passwordField.sendKeys(connections.credentials.admin.password);
        await loginPage.eyeButton.click();

        expect(loginPage.passwordField.getAttribute('type')).toEqual('text', 'password is not shown after eye button click');

        await loginPage.submit.click();

        expect(loginPage.warning.isPresent()).toBe(true, 'alert is not present');
        expect(loginPage.warning.getText()).toEqual('Uh oh! This\n' +
            'isn’t an email', 'Warning message is not correct');

    });

    it('4. Authorization page. Empty fields', async () => {

        await loginPage.loginButton.click();
        await loginPage.submit.click();
        expect(browser.getCurrentUrl()).toEqual('https://www.ssls.com/authorize', 'Did not switched to the main page')

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
        await navHelper.selectProfile();

        //Edit buttons for each fields
        //Name
        const nameValue = await $('span[ng-hide*="name"]').getText();
        console.log(nameValue);
        const nameEdit = await $('[ng-class]>button[ng-hide*="name"]');
        let saveNameButton = await element(by.xpath('//span[contains(text(),"Name")]/following::button[@type="submit"]'));
        await nameEdit.click();
        await saveNameButton.click();

        //Email
        const emailValue = await $('span[ng-hide*="email"]').getText();
        console.log(emailValue);
        const emailEdit = await $('[ng-class]>button[ng-hide*="email"]');
        await emailEdit.click();
        const password = await $('input[type="password"]');
        await password.sendKeys(connections.credentials.admin.password);
        saveNameButton = await element(by.xpath('//span[contains(text(),"Email")]/following::button[@type="submit"]'));
        await saveNameButton.click();

        //Password
        await $('[ng-class]>button[ng-hide*="password"]').click();
        await $('[name="current_password"]').sendKeys(connections.credentials.admin.password);
        await $('[name="password"]').sendKeys(connections.credentials.admin.password);
        await element(by.xpath('//span[contains(text(),"Password")]/following::button[@type="submit"]')).click();

        //Phone
        const phoneValue = await $('span[ng-hide*="phone"]').getText();
        console.log(phoneValue);
        const phoneEdit = await $('[ng-class]>button[ng-hide*="phone"]').click();
        await element(by.xpath('//span[contains(text(),"Phone")]/following::button[@type="submit"]')).click();

        //Address
        const addressValue = await $('span[ng-hide*="address"]').getText();
        console.log(addressValue);
        const addressEdit = await $('[ng-class]>button[ng-hide*="address"]').click();
        await element(by.xpath('//span[contains(text(),"Address")]/following::button[@type="submit"]')).click();

        //Support pin
        const pinValue = await $('div[ng-class*="pin"] div:nth-child(2)>span').getText();
        console.log(pinValue);

        //Newsletter
        const newslettersToggleState = await $('div[ng-class*="newsletter"] div:nth-child(2)>button')
            .getAttribute('class');
        console.log(newslettersToggleState);

        //Verify after re-login
        await logout();
        await login();
        await selectProfile();
        expect($('span[ng-hide*="name"]').getText()).toEqual(nameValue, 'email is not saved');
        expect($('span[ng-hide*="email"]').getText()).toEqual(emailValue, 'email is not saved');
        expect($('span[ng-hide*="password"]').getText()).not.toBe(null, 'email is not saved');
        expect($('span[ng-hide*="phone"]').getText()).toEqual(phoneValue, 'email is not saved');
        expect($('span[ng-hide*="address"]').getText()).toEqual(addressValue, 'email is not saved');
        expect($('div[ng-class*="pin"] div:nth-child(2)>span').getText()).toEqual(pinValue, 'email is not saved');
        expect($('div[ng-class*="newsletter"] div:nth-child(2)>button').getAttribute('class')).toEqual(newslettersToggleState, 'email is not saved');

    });

    it('7. My profile page. Refresh support pin', async () => {
        "use strict";
        await login();
        await selectProfile();
        const valueBefore = await mainPage.getSupportPinValue();
        const pinUpdate = await $('button[name="supportPin"]');
        await pinUpdate.click();
        expect(getSupportPinValue()).not.toEqual(valueBefore, 'New value was not generated')
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

        await login();
        const personalButton = await element(by.cssContainingText('.btn', 'Personal'));
        const multiDomainButton = await element(by.cssContainingText('.btn', 'multi-domain'));

        browser.wait(EC.elementToBeClickable(personalButton), 4000);
        await personalButton.click();

        //Peronal SSLs filter
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
        await browser.executeScript('arguments[0].scrollIntoView(true)',featureSortResult[4] );
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
