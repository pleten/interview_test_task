const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');

const paramsTemplate = {
    homePage: 'https://ssls.com',
};

const SELECTOR_EYE_BTN = 'div:nth-child(3) div.input-group > div.btn-box > button';
const SELECTOR_LOGIN_BTN = 'ui-view > div > ng-include > div > div > form > div.btn-box > button';

const SELECTOR_CART = 'div.cert-list.clear > div';
const SELECTOR_CART1 = 'div.cert-list.clear > div';

const SELECTOR_AUTHORIZE_BTN = 'div.log-box a';
const SELECTOR_AUTHORIZATION_PAGE = 'div.authorization-page';
const SELECTOR_USER_LOGGED_IN_BTN = 'a.btn.btn-s.round.filled.user-btn.ng-binding';
const SELECTOR_USER_LOGGED_IN_DROP_DOWN_LI = 'ul.dropdown.ng-isolate-scope > li';
const SELECTOR_USER_LOGGED_IN_DROP_DOWN_BTN = 'div.log-box > div > button';
const SELECTOR_UPDATE_REFRESH_BUTTON = '[name="supportPin"]';

const XPATH_FILTER_PERSONAL_BTN = './/a[contains(.,"Personal")]';
const XPATH_FILTER_MULTI_DOMAIN = './/a[contains(.,"multi-domain")]';
const XPATH_SORT_CHEAPEST_BTN = './/a[contains(.,"Cheapest")]';
const XPATH_SORT_FEATURED_BTN = './/a[contains(.,"Featured")]';

const XPATH_VIEW_PROFILE_BTN = './/a[contains(text(),"View profile")]';


/**
 * HomePageFiltersTestCaseParams
 * @typedef {{
 *   description: string,
 *   homePage: string,
 * }} HomePageFiltersTestCaseParams
 */

/**
 * @returns {Array<HomePageFiltersTestCaseParams>}
 */
const dataProvider = () => [
    {
        description: 'filter and sort',
        ...paramsTemplate,
    },
];

const runs = dataProvider();

runs.forEach((/** HomePageFiltersTestCaseParams */run) => {
    const {
        description,
        homePage,
    } = run;

    describe(`Home Page. ${description}` , () => {
        const driver = global.driver
            ? global.driver
            : new Builder().forBrowser('chrome').build();

        it('should follow on the home page', async () => {
            await driver.get(homePage);
        });

        it('should check products after click "Personal" filter button', async () => {

            await driver.wait(until.elementLocated(By.xpath(XPATH_FILTER_PERSONAL_BTN)));
            const personalFilterBtn = await driver.findElement(By.xpath(XPATH_FILTER_PERSONAL_BTN));
            personalFilterBtn.click();
            await driver.sleep(3000);
            const expectedPersonalFilterCartHeaderResult = [
                'EssentialSSL',
                'PositiveSSL Wildcard',
                'EssentialSSL Wildcard',
                'PositiveSSL Multi-Domain',
                'PositiveSSL',
            ];
            const productCarts = await driver.findElements(By.css(SELECTOR_CART));
            const personalFilteredCartsHeaders = await Promise.all(productCarts.map(async (formElement) => {
                const terms = await formElement.findElement(By.css(' div > a > h3'))
                    .then((result) => result.getAttribute('innerText'));
                return terms;
            }));
            expect(personalFilteredCartsHeaders).to.deep.equal(expectedPersonalFilterCartHeaderResult);

        });

        it('should check products after click "Personal" and "Multi-Domain" filter button', async () => {

            await driver.wait(until.elementLocated(By.xpath(XPATH_FILTER_MULTI_DOMAIN)));
            const multiDomainFilterBtn = await driver.findElement(By.xpath(XPATH_FILTER_MULTI_DOMAIN));
            multiDomainFilterBtn.click();
            await driver.sleep(3000);
            const expectedPersonalMultiFilterCartHeaderResult = [ 'PositiveSSL Multi-Domain' ];
            const productCarts = await driver.findElements(By.css(SELECTOR_CART));
            const personalMultiFilteredCartsHeaders = await Promise.all(productCarts.map(async (formElement) => {
                const terms = await formElement.findElement(By.css(' div > a > h3'))
                    .then((result) => result.getAttribute('innerText'));
                return terms;
            }));
            expect(personalMultiFilteredCartsHeaders).to.deep.equal(expectedPersonalMultiFilterCartHeaderResult);
            const personalFilterBtn = await driver.findElement(By.xpath(XPATH_FILTER_PERSONAL_BTN));
            personalFilterBtn.click();
            multiDomainFilterBtn.click();
        });

        it('should check products after click "cheapest" sort button', async () => {
            await driver.wait(until.elementLocated(By.xpath(XPATH_SORT_CHEAPEST_BTN)));
            const cheapestSortBtn = await driver.findElement(By.xpath(XPATH_SORT_CHEAPEST_BTN));
            cheapestSortBtn.click();
            await driver.sleep(3000);

            const productCarts = await driver.findElements(By.css(SELECTOR_CART));
            let sorted;
            let unSorted = [];
            let i = 0;
            await Promise.all(productCarts.map(async (formElement) => {
                const priceText = await formElement.findElement(By.css('div.ssl-price-box > price.lg-price.ng-isolate-scope'))
                    .then((result) => result.getAttribute('value'));
                unSorted[i] = parseInt(priceText, 10);
                i++;
            }));
            sorted = unSorted.slice();
            function sortNumber(a, b) {
                return a - b;
            };
            sorted.sort(sortNumber);
            expect(sorted).to.deep.equal(unSorted);
        });

        it('should check products after click "Featured" sort button', async () => {
            await driver.wait(until.elementLocated(By.xpath(XPATH_SORT_FEATURED_BTN)));
            const FeaturedSortBtn = await driver.findElement(By.xpath(XPATH_SORT_FEATURED_BTN));
            FeaturedSortBtn.click();
            await driver.sleep(3000);
            const expectedCheapestSortedCartHeaderResult =  [
                'EV SSL',
                'EssentialSSL',
                'PositiveSSL Wildcard',
                'EssentialSSL Wildcard',
                'PositiveSSL Multi-Domain',
                'PremiumSSL Wildcard',
                'EV Multi-Domain SSL',
                'InstantSSL',
                'Unified Communications',
                'PositiveSSL',
                'InstantSSL Pro',
                'PremiumSSL',
                'Multi-Domain SSL',
            ];
            const productCarts = await driver.findElements(By.css(SELECTOR_CART));
            const CheapestSortedCartsHeaders = await Promise.all(productCarts.map(async (formElement) => {
                const terms = await formElement.findElement(By.css(' div > a > h3'))
                    .then((result) => result.getAttribute('innerText'));
                return terms;
            }));
            expect(CheapestSortedCartsHeaders).to.deep.equal(expectedCheapestSortedCartHeaderResult);
        });



        after(async () => driver.quit());
    });
});
