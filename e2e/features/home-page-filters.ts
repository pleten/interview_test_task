import {browser} from 'protractor';
import {safeClick} from '../shared/helpers/wd-helper';
import {matchNumber} from '../shared/helpers/js-helper';
import {HomePagePo} from '../pages/home.page.po';

const homePage = new HomePagePo();

describe('Home page. Filters', async () => {

    beforeEach(async () => {
        await browser.get(homePage.pageUrl);
    });

    it('1. Home page. Filters', async () => {
        await safeClick(homePage.personalFilter);
        let productCards = await homePage.productCards.getText();
        await homePage.assertElementsLengthEqual(homePage.cardDescription, productCards.length);
        await homePage.assertElementArrayTextContains(homePage.cardDescription, 'Domain validation');
    });

    it('2. Home page. Filters', async () => {
        await safeClick(homePage.businessFilter);
        await safeClick(homePage.oneDomainFilter);
        let productCards = await homePage.productCards.getText();
        await homePage.assertElementsLengthEqual(homePage.cardDescription, productCards.length);
        await homePage.assertElementArrayTextContains(homePage.cardDescription, 'Organization validation');
        await homePage.assertElementArrayTextContains(homePage.cardDescription, '1 domain');
    });

    it('3. Home page. Filters', async () => {
        await safeClick(homePage.sortButton);
        let actualPrices = await matchNumber(await homePage.prices.getText());
        await homePage.assertSortByNumber(actualPrices);
    });
});