let page = require(`./pages/login`);

let LoginSteps = function() {

    this.fillEmailField = function(email) {
       page.emailField.sendKeys(email);
    };

    this.fillPasswordField = function(password) {
        page.passwordField.sendKeys(password);
    };

    this.clickLoginButton = function () {
        page.loginButton.click();
    };

    this.seeEmailField = function () {
        page.emailField.isDisplayed();
    };

    this.seePasswordField = function () {
        page.passwordField.isDisplayed();
    };

    this.clickShowPasswordButton = function () {
        page.showPasswordButton.click();
    };

    this.seeTextInPasswordField = function (text) {
        expect(page.passwordField.getAttribute('type')).toBe("text");
        expect(page.passwordField.getAttribute('value')).toBe(text);
    };

    this.seeTextInNotify = function (text) {
        browser.wait(function() {
            return page.notyText.isDisplayed();
        }, 5000);
        expect(page.notyText.getText()).toBe(text);
    };

    this.seeTextInEmailTooltip = function (text) {
        expect(page.emailTooltip.getText()).toBe(text);
    };

    this.seeTextInPasswordTooltip = function (text) {
        expect(page.passwordTooltip.getText()).toBe(text);
    };
};
module.exports = new LoginSteps();