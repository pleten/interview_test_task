let AuthorizationPage = function() {

    let until = protractor.ExpectedConditions;
    const title = element(by.css('.page-title'));
    const emailField = element(by.model('form.email'));
    const passwordField = element(by.model('form.password'));
    const eyeIcon = element(by.css('.icon-eye'));
    const loginBtn = element(by.css('[name="authForm"] .btn'));
    const notification = element(by.css('.noty_text'));
    const invalidEmailError = element(by.css('[ng-show="authForm.email.$dirty && (authForm.email.$error.email || authForm.email.$error.pattern)"]'));
    const emptyEmailError = element(by.css('[ng-show="(authForm.email.$dirty || authForm.$submitted) && authForm.email.$error.required"]'));
    const emptyPasswordError = element(by.css('[ng-show="(authForm.password.$dirty || authForm.$submitted) && authForm.password.$error.required"]'));

    this.getNotification = function () {
        return notification;
    };

    this.getEmptyEmailError = function () {
        return emptyEmailError.getText();
    };

    this.getEmptyPasswordError = function () {
        return emptyPasswordError.getText();
    };

    this.getTitle = function () {
        return title.getText();
    };

    this.getInvalidEmailError = function () {
        return invalidEmailError.getText();
    };

    this.getPasswordAttribute = function () {
        return passwordField.getAttribute('type');
    };

    this.fillEmailField = function(email) {
        emailField.sendKeys(email);
    };

    this.fillPassword = function(password) {
        passwordField.sendKeys(password);
    };

    this.clickEyeIcon = function () {
        eyeIcon.click();
    };

    this.waitNotification = function () {
        browser.wait(until.visibilityOf(notification), 5000);
    };

    this.clickLoginBtn = function () {
        loginBtn.click();
    };

    this.submitLoginFormAs = function (email, password) {
        this.fillEmailField(email);
        this.fillPassword(password);
        this.clickLoginBtn();
    };

};
module.exports = new AuthorizationPage();