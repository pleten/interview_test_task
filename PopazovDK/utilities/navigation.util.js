let navigationUtil = function () {

    let ec = protractor.ExpectedConditions;
    let defaultWaitTime = browser.params.elementDefaultWaitTime;

    this.waitTillElementToBeClickable = (element, milliseconds) => {
        let delay = milliseconds || defaultWaitTime;
        browser.wait(ec.elementToBeClickable(element), delay);
    };

    this.waitTillTextToBePresentInElement = (element, text, milliseconds) => {
        let delay = milliseconds || defaultWaitTime;
        browser.wait(ec.textToBePresentInElementValue(element, text), delay, `Element with  text: ${text} not displayed`);
    };
};

module.exports = new navigationUtil();