const loginPage = require('../common/pages/login_page.js');
const connections = require('../connections.json');
const EC = protractor.ExpectedConditions;

describe('Test task', () => {


    async function login(email, password) {
        "use strict";
        email = connections.credentials.admin.login;
        password = connections.credentials.admin.password;
        const userDropDownButton = await $('.dropdown-btn');
        const loginButton = await $('.btn.flat-dark.ng-scope');
        await loginButton.click();
        const emailField = await $('div[class="form-group email"]>input[name="email"]');
        await emailField.sendKeys(email);
        const passwordField = await $('div[class="input-box password"]>input[name="password"]');
        await passwordField.sendKeys(password);
        const submit = $$('[type="submit"]').first();
        await submit.click();
        browser.wait(EC.elementToBeClickable(userDropDownButton), 4000);

    }

    async function logout() {
        "use strict";
        const userDropDownButton = await $('.dropdown-btn');
        if (await userDropDownButton.isPresent()) {
            await userDropDownButton.click();
            const logOutButton = await $('.drop-button');
            await logOutButton.click();
        }
    }

    async function selectProfile() {
        const userDropDownButton = await $('.dropdown-btn');
        await userDropDownButton.click();
        const viewProfileButton = await $('a[ui-sref="user.profile"]');
        await viewProfileButton.click();
    }

    async function getSupportPinValue() {
        const supportPinValueElement = element(by.xpath('//span[contains(text(),"Support pin")]/following::div[@class="description"]/span[@class="text ng-binding"]'));
        return await supportPinValueElement.getText();
    }


    beforeEach(async () => {
        await browser.get('https://ssls.com');
        console.log('go to url');
    });

    afterEach(async () => {
        await logout();
        await browser.refresh();

    });

    it('1. Authorization page (Welcome back!)', async () => {

        browser.sleep(15000);

        const loginButton = await $('.btn.flat-dark.ng-scope');
        await loginButton.click();
        const email = await $('div[class="form-group email"]>input[name="email"]');
        await email.sendKeys(connections.credentials.admin.login);
        const password = await $('div[class="input-box password"]>input[name="password"]');
        await password.sendKeys(connections.credentials.admin.password);
        await $('.icon.icon-eye').click();

        expect(password.getAttribute('type')).toEqual('text', 'password is not shown after eye button click');
        const submit = $$('[type="submit"]').first();
        await submit.click();

        expect(browser.getCurrentUrl()).toEqual('https://www.ssls.com/', 'Did not switched to the main page')

        const userButton = $('.btn.user-btn');
        expect(userButton.getText()).toEqual('ssls.automation+5@gmail.com', 'User name is not presented on the login button')
        expect($('.dropdown-btn').isPresent()).toBe(true, 'Dropdown is not presented');

    });

    it('2. Authorization page. Not registered user', async () => {

        const loginButton = await $('.btn.flat-dark.ng-scope');

        browser.wait(EC.elementToBeClickable(loginButton), 3000);
        await loginButton.click();

        const email = await $('div[class="form-group email"]>input[name="email"]');
        await email.sendKeys('invalid@password.com');
        const password = await $('div[class="input-box password"]>input[name="password"]');
        await password.sendKeys(connections.credentials.admin.password);
        await $('.icon.icon-eye').click();
        expect(password.getAttribute('type')).toEqual('text', 'password is not shown after eye button click');
        const submit = $$('[type="submit"]').first();
        await submit.click();
        expect(browser.getCurrentUrl()).toEqual('https://www.ssls.com/authorize', 'Did not switched to the main page');
        const alert = await $('.noty_text');
        browser.wait(EC.presenceOf(alert), 2000);
        expect(alert.isPresent()).toBe(true, 'alert is not present');
        expect(alert.getText()).toEqual('Uh oh! Email or password is incorrect', 'Warning message is not correct');

    });

    it('3. Authorization page. Invalid email', async () => {

        const loginButton = await $('.btn.flat-dark.ng-scope');
        await loginButton.click();
        const email = await $('div[class="form-group email"]>input[name="email"]');
        await email.sendKeys('ssls.automation+5@@gmail.com');
        const password = await $('div[class="input-box password"]>input[name="password"]');
        await password.sendKeys(connections.credentials.admin.password);
        await $('.icon.icon-eye').click();
        expect(password.getAttribute('type')).toEqual('text', 'password is not shown after eye button click');
        const submit = $$('[type="submit"]').first();
        await submit.click();

        const warning = await $('.tooltip.tooltip-error');
        expect(warning.isPresent()).toBe(true, 'alert is not present');
        expect(warning.isPresent()).toBe(true, 'alert is not present');
        expect(warning.getText()).toEqual('Uh oh! This\n' +
            'isn’t an email', 'Warning message is not correct');

    });

    it('4. Authorization page. Empty fields', async () => {

        const loginButton = await $('.btn.flat-dark.ng-scope');
        await loginButton.click();
        const submit = await $$('[type="submit"]').first();
        await submit.click();
        expect(browser.getCurrentUrl()).toEqual('https://www.ssls.com/authorize', 'Did not switched to the main page')

        const emailWarning = element.all(by.xpath('//div[@class="form-group email"]/descendant::span[@class="tooltip-text"]')).get(1);
        console.log(await emailWarning.getText());
        expect(emailWarning.getText()).toEqual('Oops, please\n' +
            'enter your email', 'Warning message or email is not correct');

        const passwordWarning = element.all(by.xpath('//div[@class="form-group email"]/following::span[@class="tooltip-text"]')).first();
        expect(passwordWarning.isPresent()).toBe(true, 'alert is not present');
        expect(passwordWarning.getText()).toEqual('Looks like you’ve\n' +
            'missed this one', 'Warning message is not correct');

    });


    it('5. Log Out.', async () => {

        await login();
        await logout();
        expect(browser.getCurrentUrl()).toEqual('https://www.ssls.com/authorize', 'Page was not switched after logout');

    });

    it('6. My profile page. Client area', async () => {


        await login();
        await selectProfile();

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
        const valueBefore = await getSupportPinValue();
        const pinUpdate = await $('button[name="supportPin"]');
        await pinUpdate.click();
        expect(getSupportPinValue()).not.toEqual(valueBefore, 'New value was not generated')
    });

    fit('8. Home page. Filters', async () => {

        await login();
        const personalButton = await element(by.cssContainingText('.btn', 'Personal'));
        const multiDomainButton = await element(by.cssContainingText('.btn', 'multi-domain'));

        browser.wait(EC.elementToBeClickable(personalButton), 4000);
        await personalButton.click();

        const personalSSLList =
            [
                'PositiveSSL',
                'EssentialSSL',
                'PositiveSSL Wildcard',
                'PositiveSSL Multi-Domain',
                'EssentialSSL Wildcard'
            ];
        //Personal
        await $$('.ssl-name.ng-binding').then(results => {
            "use strict";
            expect(results.length).toBe(5);
            results.forEach(async item => {
                expect(personalSSLList.includes(await item.getText())).toBe(true, `${await item.getText()} is not present in the results`);
            })
        });

        //Multi-Domain filter
        await multiDomainButton.click();
        await $$('.ssl-name.ng-binding').then(results => {
            expect(results.length).toBe(1);
            expect(results[0].getText()).toBe(personalSSLList[3], 'Multi-Domain filter is not working');
        });

        //Sorting
        await multiDomainButton.click();
        await personalButton.click();
        debugger;
        const cheapestButton = await element(by.cssContainingText('a', 'Cheapest'));
        await cheapestButton.click();
        debugger;
        const featuredElement = await element(by.cssContainingText('a', 'Featured'));
        expect(featuredElement.isDisplayed()).toBe(true, 'Button switched to Featured sort');

        let arrayToVerify = [];

        const sslItems = await $$('.ssl-content');
        expect(sslItems.length).toBe(13, 'Some SSL item are missed');
        // sslItems.forEach(async item => {
        //     //console.log(await item.getText());
        //     const price = await item.$('.ssl-price-box>price:first-child').getAttribute('value');
        //     arrayToVerify.push(parseInt(price));
        //     console.log('price>>>> ' + price);
        //     console.log('intermediate array   ' + arrayToVerify);
        // });

        async function asyncForEach(array, callback) {
            for (let index = 0; index < array.length; index++) {
                await callback(array[index], index, array);
            }
        }

        await asyncForEach(sslItems, async item => {
            const price = await item.$('.ssl-price-box>price:first-child').getAttribute('value');
            arrayToVerify.push(parseInt(price));
            console.log('price>>>> ' + price);
            console.log('intermediate array   ' + arrayToVerify);
        });

        function isSorted(array) {
            let result = false;
            for (let i = 0; i < array.length; i++) {
                if (array[i] < array[i + 1]) {
                    result = true;
                } else if (array[i] > array[i + 1]) {
                    result = false;
                    break;
                }
            }
            return result;
        }

        expect(isSorted(arrayToVerify)).toBe(true, 'Array is not sorted ascending');

        //

    });

});
