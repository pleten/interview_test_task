const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

const paramsTemplate = {
    homePage: 'https://ssls.com',
    testUserLoginEmail: 'ssls.automation+5@gmail.com',
    testUserPassword: '123456',
    expectedRedirectUrl: 'https://www.ssls.com/authorize',
};

const SELECTOR_EYE_BTN = 'div:nth-child(3) div.input-group > div.btn-box > button';
const SELECTOR_LOGIN_BTN = 'ui-view > div > ng-include > div > div > form > div.btn-box > button';
const SELECTOR_AUTHORIZE_BTN = 'div.log-box a';
const SELECTOR_AUTHORIZATION_PAGE = 'div.authorization-page';
const SELECTOR_USER_LOGGED_IN_BTN = 'a.btn.btn-s.round.filled.user-btn.ng-binding';
const SELECTOR_USER_LOGGED_IN_DROP_DOWN_LI = 'ul.dropdown.ng-isolate-scope > li';
const SELECTOR_USER_LOGGED_IN_DROP_DOWN_BTN = 'div.log-box > div > button';
const SELECTOR_USER_PROFILE_FORM_TERMS = 'div.terms span';
const SELECTOR_USER_PROFILE_FORM_DESCRIPTION = 'div.description span';
const SELECTOR_USER_PROFILE_FORM = 'div.page-content > div > div:nth-child(2) >' +
    ' div > form > div';

const XPATH_LOG_OUT_BTN = './/button[contains(text(),"Log out")]';
const XPATH_VIEW_PROFILE_BTN = './/a[contains(text(),"View profile")]';

const login = (driver, homePage, testUserLoginEmail, testUserPassword) => {
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

    it('should click login button', async () => {
        await driver.findElement(By.css(SELECTOR_LOGIN_BTN)).click();
    });
};

const saveProfile = (driver, toolTipMessages) => {
    it('should open user profile page', async () => {
        await driver.sleep(2000);
        const userLoggedInDropDownBtn = await driver.findElement(By.css(SELECTOR_USER_LOGGED_IN_DROP_DOWN_BTN));
        userLoggedInDropDownBtn.click();
        const viewProfileBtn = await driver.findElement(By.xpath(XPATH_VIEW_PROFILE_BTN));
        viewProfileBtn.click();
    });

    it('should save values from user profile form ', async () => {
        await driver.sleep(2000);
        const userProfileForm = await driver.findElements(By.css(SELECTOR_USER_PROFILE_FORM));
        toolTipMessages = await Promise.all(userProfileForm.map(async (formElement) => {
            let line = {};
            const terms = await formElement.findElement(By.css(SELECTOR_USER_PROFILE_FORM_TERMS))
                .then((result) => result.getAttribute('innerText'));
            const description = await formElement.findElement(By.css(SELECTOR_USER_PROFILE_FORM_DESCRIPTION))
                .then((result) => result.getAttribute('innerText'));
            line[terms] = description;
            return line;
        }));
    });
    return toolTipMessages
};

/**
 * MyProfilePageTestCaseParams
 * @typedef {{
 *   description: string,
 *   homePage: string,
 *   testUserLoginEmail: string,
 *   testUserPassword: string,
 *   expectedRedirectUrl: string,
 * }} MyProfilePageTestCaseParams
 */

/**
 * @returns {Array<MyProfilePageTestCaseParams>}
 */
const dataProvider = () => [
    {
        description: 'Log out user',
        ...paramsTemplate,
    },
];

const runs = dataProvider();

runs.forEach((/** MyProfilePageTestCaseParams */run) => {
    const {
        description,
        homePage,
        testUserLoginEmail,
        testUserPassword,
        expectedRedirectUrl,
    } = run;
    let FormVal, expecteFormVal;

    describe(`Log Out. ${description}` , () => {
        const driver = global.driver
            ? global.driver
            : new Builder().forBrowser('chrome').build();

        login(driver, homePage, testUserLoginEmail, testUserPassword);

        it('should login user and change "Login" button on "User@email" button (with dropdown menu)', async () => {
            const userLoggedInBtnText = await driver.wait(until.elementLocated(By.css(SELECTOR_USER_LOGGED_IN_BTN)))
                .getAttribute('text');
            expect(userLoggedInBtnText, 'user Email incorrect in user LoggedIn button').to.equal(testUserLoginEmail);
            const userLoggedInDropDown = await driver.findElements(By.css(SELECTOR_USER_LOGGED_IN_DROP_DOWN_LI));
            expect(userLoggedInDropDown.length > 0, 'user LoggedIn drop-down does not exist').to.be.true;
        });

        saveProfile(driver, FormVal);

        it('should logout user', async () => {
            const userLoggedInDropDownBtn = await driver.findElement(By.css(SELECTOR_USER_LOGGED_IN_DROP_DOWN_BTN));
            userLoggedInDropDownBtn.click();
            const userLogOutBtn = await driver.findElement(By.xpath(XPATH_LOG_OUT_BTN));
            userLogOutBtn.click();
        });

        it('should redirect user on authorization page ', async () => {
            await driver.sleep(4000);
            driver.getCurrentUrl().then(url => {
                expect(url).to.equal(expectedRedirectUrl);
            });
        });

        login(driver ,homePage, testUserLoginEmail, testUserPassword);

        saveProfile(driver ,expecteFormVal);
        it('should compare profile data', async () => {
            expect(FormVal).to.deep.equal(expecteFormVal);
        });

        after(async () => driver.quit());
    });
});
