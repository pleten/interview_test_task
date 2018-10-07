let LoginPage = function() {

    this.emailField = element(by.css('.email [type="email"]'));
    this.passwordField = element(by.name('password'));
    this.showPasswordButton = element.all(by.xpath(`//*[contains(@ng-click, "showPassword")]`));
    this.loginButton = element(by.css('.primary'));
    this.notyText = element(by.css('.noty_text'));
    this.emailTooltip = element(by.css('.form-group.email .left-tooltip-box:not(.ng-hide) .tooltip-text'));
    this.passwordTooltip = element(by.css('.form-group:not(.email) .left-tooltip-box:not(.ng-hide) .tooltip-text'));
};
module.exports = new LoginPage();