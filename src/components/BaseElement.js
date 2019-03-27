export default class BaseElement {
    constructor(value) {
        this.value = value;
    }

    get element() {
        return browser.element(this.value);
    }

    get elements() {
        return browser.elements(this.value);
    }

    shouldBeVisible() {
        this.element.waitForEnabled();
        this.element.waitForExist();
        this.element.waitForVisible();
        this.element.scroll(this.element);
        return this.element;
    }

    shouldNotExist(ms, reverse) {
        this.element.waitForExist(ms, reverse);
        return this.element;
    }

    click() {
        this.shouldBeVisible().click();
    }

    shouldBeAllVisible() {
        this.elements.waitForVisible();
        return this.elements;
    }

    elementExists() {
        this.element.isExisting();
        return this.element;
    }

    enterValue(text) {
        this.shouldBeVisible().setValue(text);
    }

    getValueText() {
        return this.shouldBeVisible().getText();
    }

    getAllValuesTexts() {
        return this.shouldBeAllVisible().getText();
    }
}
