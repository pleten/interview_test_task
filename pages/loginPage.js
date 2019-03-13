var LoginPage = function async () {

    var showPasswordButton = $('.btn-input.btn-input-block');
    var passwordInput = $('.input-box.password > input');
    var emailInput = $('.form-group.email > input');
    var loginButton = $('.btn-box .block.primary');
    var invalidCredentialsErrorMessage = $('.noty_message span');
    var emailErrorMessage = $('.email .left-tooltip-box:not(.ng-hide)');
    var passwordErrorMessage = $('.form-group:not(.email) .left-tooltip-box:not(.ng-hide)');

    this.getEmailErrorMessage = function() {
        return emailErrorMessage;
    };

    this.getPasswordErrorMessage = function() {
        return passwordErrorMessage;
    };

    this.getInvalidCredentialsErrorMessage = function() {
        return invalidCredentialsErrorMessage;
    };

    this.enterEmail = async function(email) {
        await emailInput.sendKeys(email);
    };

    this.enterPassword = async function(pass) {
        await passwordInput.sendKeys(pass);
    };

    this.showPassword = async function() {
        await showPasswordButton.click();
    };

    this.clickLoginButton = async function() {
        await loginButton.click();
    };

    this.getPassword = async function() {
        return passwordInput.getAttribute('value');
    };

};
module.exports = LoginPage;