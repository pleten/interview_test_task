import {browser, ElementFinder, ElementArrayFinder} from 'protractor';
import {expect} from 'chai';
import {waitForClickable} from '../helpers/wd-helper';

export abstract class BaseComponent {

    assertElementDisplayed(elementFinder: ElementFinder) {
        return expect(elementFinder.isDisplayed()).to.eventually.equal(true);
    }

    async sendQuery(field: ElementFinder, query: string) {
        await field.clear();
        await field.sendKeys(query);
    }

    async waitForElementPresent(elementFinder: ElementFinder | ElementArrayFinder, timeout = 8000) {
        await browser.wait(() => elementFinder.isPresent().then(isPresent => isPresent), timeout).catch(err => false);
    }

    async assertElementTextContains(elementFinder, text: string) {
        await this.waitForElementPresent(elementFinder);
        await waitForClickable(elementFinder);

        await expect(elementFinder.getText()).to.eventually.contain(text);
    }

    async assertElementTextNotEquals(text: string, changedText: string) {
        await expect(text).not.to.equal(changedText);
    }

    async assertCurrentUrlContains(text: string) {
        await expect(browser.getCurrentUrl()).to.eventually.contain(text);
    }

    async assertElementsLengthEqual(elements: ElementArrayFinder, expectedNumber) {
        await expect(elements.count()).to.eventually.equal(parseInt(expectedNumber));
    }

    async assertElementArrayTextContains(elements: ElementArrayFinder, text: string) {
        await this.waitForElementPresent(elements);
        let elementText = await elements.getText();
        for (let i = 0; i < elementText.length; i++) {
            await expect(elementText[i]).to.contains(text);
        }
    }

    async assertArraysAreEqual(arrayActual, arrayToCompare) {
        for (let i = 0; i < arrayActual.length; i++) {
            await expect((arrayActual[i]) === arrayToCompare[i]).equal(true,
                'Actual: ' + arrayActual[i] + 'do not match with expected: ' + arrayToCompare[i]);
        }
    }

    async assertSortByNumber(array) {
        const actualArray = array.slice(0);
        let sortArray = await array.sort((a, b) => (a - b));
        await this.assertArraysAreEqual(actualArray, sortArray);
    }

    async assertValuesEquals(actualVal, expectedVal) {
        await expect(actualVal).equal(expectedVal);
    }
}