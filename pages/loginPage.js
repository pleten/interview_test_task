'use strict';

let LoginPage = function() {

    let emailInput = element(by.model('form.email'));
    let passwordInput = element(by.model('form.password'));
    let loginButton = element(by.css('button.primary'));
    let showPasswordButton = element(by.css('button[ng-click="showPassword = !showPassword"]'));
    let notification = element(by.css('li.notification span.noty_text'));
    let errorMessage = element(by.css('div.left-tooltip-box:not(.ng-hide)'));

    this.enterEmail = (email) => {
        emailInput.sendKeys(email);
    };

    this.enterPassword = (password) => {
        passwordInput.sendKeys(password);
    };

    this.pressLoginButton = () => {
        loginButton.click();
    };

    this.login = (email, password) => {
        this.enterEmail(email);
        this.enterPassword(password);
        this.pressLoginButton();
    };

    this.showPassword = () => {
        return showPasswordButton.click();
    };

    this.getPassword = () => {
        return passwordInput.getAttribute('value');
    };

    this.getNotificationText = () => {
        let until = protractor.ExpectedConditions;
        browser.wait(until.presenceOf(notification), 40000, 'Element taking too long to appear in the DOM');
        return notification.getText();
    };

    this.getErrors = () => {
        let until = protractor.ExpectedConditions;
        browser.wait(until.presenceOf(errorMessage), 25000, 'Element taking too long to appear in the DOM');
        return element.all(by.css('div.left-tooltip-box:not(.ng-hide)'));
    };
};
module.exports = new LoginPage();