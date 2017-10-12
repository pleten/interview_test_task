var helpers = require('protractor-helpers');

var AuthorizationPage = function() {
    var self = this;
    var data = browser.params.data;

    this.emptyPasswordError = $("div[class='form-group'] div[class='left-tooltip-box']")
    this.emptyEmailError = $(".email div[class='left-tooltip-box']")
    this.tooltipMessage = $('.tooltip-text');
    this.authContainer = $('.authorization-page');
    this.errorMessage = $('.noty_text');
    this.eyeIcon = $('.btn-input');
    this.email = element(by.model('form.email'));
    this.password = element(by.model('form.password'));
    this.loginBtn = element(by.buttonText('Login'));


    /**
     * @param {object} user
     */
    this.login = function(user) {
        this.email.sendKeys(user.email);
        this.password.sendKeys(user.password);
        user.isPasswordCheckRequired && checkPassword(user.password);
        this.loginBtn.click();
        user.isNotRegistered && helpers.waitForElement(this.errorMessage, 1000);
    }

    /**
     * @param {string} password
     */
    function checkPassword(password) {
        self.eyeIcon.click();
        expect(self.password.getAttribute('type')).toEqual('text');
        expect(self.password.getAttribute('value')).toEqual(password);
    }
}

module.exports = AuthorizationPage;
