const EC = protractor.ExpectedConditions;


const LoginPage = function() {
    // elements
    const emailField = element(by.css('.form-group.email input'));
    const passwordField = element(by.css('.input-box.password input'));
    const loginButton = element(by.css('form button.btn.block.primary'));

    const notRegisteredUserInfoMessage = element(by.css('span.noty_text'));
    const emailErrorMessage = element(by.css(`[class=left-tooltip-box][ng-show*='authForm.email'] span`));
    const passwordErrorMessage = element(by.css(`[class=left-tooltip-box][ng-show*='authForm.password'] span`));


    // methods
    this.fillEmailField = function (email) {
        console.log(`Enter email: '${email}'`);
        return emailField.sendKeys(email);
    };

    this.fillPasswordField = function (password) {
        console.log(`Enter password: '${password}'`);
        return passwordField.sendKeys(password);
    };

    this.submitForm = function () {
        console.log('Click on login button');
        return loginButton.click();
    };

    this.getNotRegisteredUserInfoMessageText = function() {
        console.log('Get info message text');
        browser.wait(EC.elementToBeClickable(notRegisteredUserInfoMessage), 5000);
        return notRegisteredUserInfoMessage.getText();
    };

    this.getEmailErrorMessageText = function() {
        console.log('Get error message text');
        return emailErrorMessage.getText();
    };

    this.getPasswordErrorMessageText = function() {
        console.log('Get error message text');
        return passwordErrorMessage.getText();
    };
};

module.exports = new LoginPage();