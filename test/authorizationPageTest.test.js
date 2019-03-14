const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

const userNotRegisterExpectedText = 'Uh oh! Email or password is incorrect';
const paramsTemplate = {
    homePage: 'https://ssls.com',
    testUserLoginEmail: 'ssls.automation+5@gmail.com',
    testUserPassword: '123456',
    isEmptyFields: false,
    isLoggedin: false,
    isValidPassword: true,
    isValidEmail: true,
    notRegisteredUser: false,
};

const SELECTOR_EYE_BTN = 'div:nth-child(3) div.input-group > div.btn-box > button';
const SELECTOR_LOGIN_BTN = 'ui-view > div > ng-include > div > div > form > div.btn-box > button';//authorize
const SELECTOR_AUTHORIZE_BTN = 'div.log-box a';
const SELECTOR_AUTHORIZATION_PAGE = 'div.authorization-page';
const SELECTOR_USER_LOGGED_IN_BTN = 'a.btn.btn-s.round.filled.user-btn.ng-binding';
const SELECTOR_USER_LOGGED_IN_DROP_DOWN_LI = 'ul.dropdown.ng-isolate-scope > li';
const SELECTOR_USER_NOT_REGISTER_NOTIFICATION = 'div.noty_bar div.noty_message span';

const XPATH_FORM_TOOL_TIP_BOXES = './/div[@class="left-tooltip-box"]//span[@class="tooltip-text"]';

/**
 * AuthorizationPageTestCaseParams
 * @typedef {{
 *   description: string,
 *   homePage: string,
 *   testUserLoginEmail: string,
 *   testUserPassword: string,
 *   isLoggedin: boolean,
 *   isValidPassword: boolean,
 *   isValidEmail: boolean,
 *   isEmptyFields: boolean,
 *   notRegisteredUser: boolean,
 * }} AuthorizationPageTestCaseParams
 */

/**
 * @returns {Array<AuthorizationPageTestCaseParams>}
 */
const dataProvider = () => [
    {
        description: '(Welcome back!)',
        ...paramsTemplate,
        isLoggedin: true,
    },
    {
        description: 'Not registered user',
        ...paramsTemplate,
        notRegisteredUser: true,
        testUserLoginEmail: 'ssls.automation+not+register@gmail.com',
    },
    {
        description: 'Invalid email',
        ...paramsTemplate,
        testUserLoginEmail: 'invalid_email',
        isValidEmail: false,
    },
    {
        description: 'Empty fields',
        ...paramsTemplate,
        isEmptyFields: true,
        isValidPassword: false,
        testUserLoginEmail: '',
        testUserPassword: '',
    },
];

const runs = dataProvider();

runs.forEach((/** AuthorizationPageTestCaseParams */run) => {
    const {
        description,
        homePage,
        isEmptyFields,
        isLoggedin,
        isValidPassword,
        isValidEmail,
        notRegisteredUser,
        testUserLoginEmail,
        testUserPassword,
    } = run;
    let driver;
    before(async () => {
        driver = global.driver ? global.driver : new Builder().forBrowser('chrome').build();
    });
    describe(`Authorization page. ${description}` , () => {


        it('should enter email and password', async () => {
            await driver.get(homePage);
            await driver.wait(until.elementLocated(By.css(SELECTOR_AUTHORIZE_BTN)));
            await driver.findElement(By.css(SELECTOR_AUTHORIZE_BTN)).click();
            await driver.wait(until.elementLocated(By.css(SELECTOR_AUTHORIZATION_PAGE)));
            await driver.wait(until.elementLocated(By.css(SELECTOR_EYE_BTN)));
            await driver.wait(until.elementLocated(By.name('email')));
            await driver.wait(until.elementLocated(By.name('password')));
            await driver.findElement(By.name('email')).sendKeys(testUserLoginEmail);
            await driver.findElement(By.name('password')).sendKeys(testUserPassword);
        });

        if (isValidPassword) {
            it('should click "show password" button', async () => {
                await driver.findElement(By.css(SELECTOR_EYE_BTN)).click();
            });

            it('login form should show password', async () => {
                const passwordType = await driver.findElement(By.name('password')).getAttribute('type');
                expect(passwordType, 'password input element type is not "text"').to.equal('text');
                const passwordValue = await driver.findElement(By.name('password')).getAttribute('value');
                expect(passwordValue, 'password input element value incorrect').to.equal(testUserPassword);
            });
        }
        it('should click login button', async () => {
            await driver.findElement(By.css(SELECTOR_LOGIN_BTN)).click();
        });

        if (isLoggedin) {
            it('should login user and change "Login" button on "User@email" button (with dropdown menu)', async () => {

                const userLoggedInBtnText = await driver.wait(until.elementLocated(By.css(SELECTOR_USER_LOGGED_IN_BTN)))
                    .getAttribute('text');
                expect(userLoggedInBtnText, 'user Email incorrect in user LoggedIn button').to.equal(testUserLoginEmail);
                const userLoggedInDropDown = await driver.findElements(By.css(SELECTOR_USER_LOGGED_IN_DROP_DOWN_LI));
                expect(userLoggedInDropDown.length > 0, 'user LoggedIn drop-down does not exist').to.be.true;
            });
        }

        if (notRegisteredUser) {
            it('should check notification "user not registered"', async () => {
                await driver.wait(until.elementLocated(By.css(SELECTOR_USER_NOT_REGISTER_NOTIFICATION)));
                await driver.sleep(2000);
                const userNotRegisteredText = await driver.findElement(By.css(SELECTOR_USER_NOT_REGISTER_NOTIFICATION))
                    .getText();
                expect(userNotRegisteredText, '"user not register" text does not match')
                    .to.equal(userNotRegisterExpectedText);
            });
        }

        if (!isValidEmail) {
            it('should check notification "user not registered"', async () => {
                await driver.findElement(By.xpath(XPATH_FORM_TOOL_TIP_BOXES))
                    .getAttribute('innerText')
                    .then(function(message) {
                    expect(message).to.equal('Uh oh! This\nisn’t an email');
                });
            });
        }

        if (isEmptyFields) {
            it('should check notifications empty line: email, password', async () => {
                let toolTipElements = await driver.findElements(By.xpath(XPATH_FORM_TOOL_TIP_BOXES));
                const toolTipMessages = await Promise.all(toolTipElements.map(async (element) => {
                    return await element.getAttribute('innerText');
                }));

                const expectedEmptyLineToolTipMessages = [
                    'Oops, please\nenter your email',
                    'Looks like you’ve\nmissed this one'
                ];
                expect(toolTipMessages).to.deep.equal(expectedEmptyLineToolTipMessages);

            });
        }

        after(async () => driver.quit());
    });
});
