class Wd {
	get defaultWaitTime() { return browser.config.waitforTimeout }

	open(path) {
		browser.url(path);
	}

	refreshPage() {
		browser.refresh();
	}

	click(selector, waitTime = this.defaultWaitTime) {
		$(selector).waitForDisplayed(waitTime);
		$(selector).waitForEnabled(waitTime);
		$(selector).click();
	}

	setValue(selector, value, waitTime = this.defaultWaitTime) {
		$(selector).waitForDisplayed(waitTime);
		$(selector).setValue(value);
	}

	waitForDisplayed(selector, waitTime = this.defaultWaitTime) {
		$(selector).waitForDisplayed(waitTime);
	}

	waitForNotVisible(selector, waitTime = this.defaultWaitTime) {
		$(selector).waitForDisplayed(waitTime, true);
	}

	waitForEnabled(selector, waitTime = this.defaultWaitTime) {
		$(selector).waitForEnabled(waitTime);
	}

	getElement(selector, waitTime = this.defaultWaitTime) {
		this.waitForDisplayed(selector, waitTime);
		return browser.$(selector);
	}

	getElements(selector, waitTime = this.defaultWaitTime) {
		this.waitForDisplayed(selector, waitTime);
		return browser.$$(selector);
	}

	getText(selector, waitTime = this.defaultWaitTime) {
		$(selector).waitForDisplayed(waitTime);
		return $(selector).getText();
	}

	getValue(selector, waitTime = this.defaultWaitTime) {
		$(selector).waitForDisplayed(waitTime);
		return $(selector).getValue();
	}

	getAttribute(selector, attributeName, waitTime = this.defaultWaitTime) {
		$(selector).waitForDisplayed(waitTime);
		return $(selector).getAttribute(attributeName);
	}

	moveToObject(selector, waitTime = this.defaultWaitTime) {
		$(selector).waitForDisplayed(waitTime);
		$(selector).moveToObject();
	}

	getElementsTextArray(selector, waitTime = this.defaultWaitTime) {
		$(selector).waitForDisplayed(waitTime);
		let elements = browser.$$(selector);
		let result = [];
		elements.forEach( element => result.push(element.getText()));
		return result;
	}


	isPresent(selector, waitTime = this.defaultWaitTime) {
		$(selector).waitForDisplayed(waitTime);
		$(selector).waitForExist(waitTime);
		return $(selector).isExisting();
	}

	elementIsDisplayed(selector) {
		return $(selector).isDisplayed();
	}

	pressEnterKey() {
		browser.keys('\uE007');
	}

	randomValue(value = []) {
		return value[Math.floor(Math.random() * value.length)]
	}

}

export default new Wd();
