'use strict';

var AuthorizationPage = function() {
    this.iptEmail = element(by.model('form.email'));
    this.iptPassword = element(by.model('form.password'));
    this.btnLogin = element(by.cssContainingText('.btn.block.primary', 'Login'));
    this.btnShowPassword = element(by.css('.icon-eye'));
    this.msgNotification = element(by.css('.noty_message'));
    this.msgTooltipNotificationInvalidEmail = element(by.css('div[ng-show="authForm.email.$dirty && (authForm.email.$error.email || authForm.email.$error.pattern)"]'));
    this.msgTooltipNotificationEmptyEmail = element(by.css('div[ng-show="(authForm.email.$dirty || authForm.$submitted) && authForm.email.$error.required"]'));
    this.msgTooltipNotificationEmptyPassword = element(by.css('div[ng-show="(authForm.password.$dirty || authForm.$submitted) && authForm.password.$error.required"]'));

    this.login = function(email, password) {
        this.iptEmail.clear().sendKeys(email);
        this.iptPassword.clear().sendKeys(password);
        this.btnLogin.click();
    };
};

module.exports = AuthorizationPage;