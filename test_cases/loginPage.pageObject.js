// Login page - page object
let LoginPage = function () {
    this.loginPageButton = element(by.css('.log-box'));
    this.loginPage = element(by.css('.authorization-content'));
    this.emailInput = element(by.model('form.email'));
    this.passwordInput = element(by.model('form.password'));
    this.viewPasswordButton = element(by.css('form[name=\'authForm\'] > div:nth-child(3) > div > div.input-group > div > button'));
    this.loginButton = element(by.css('form[name=\'authForm\'] > div > button'));
    this.userPageButton = element(by.css('.user-btn'));

    this.userMenuDropdownd = element(by.css('.dropdown-btn'));
    this.userProfileButton = element(by.css('a[href*=\'/user/profile\']'));
    this.userProfilePage = element(by.css('.profile-content'));
    this.userMenuLogoutButton = element(by.css('button.drop-button'));

    this.incorectEmailOrPass_errorMessage = element(by.css('.noty_message > span'));
    this.invalidEmail_errorMessage = element(by.css('.form-group.email > div:first-of-type'));
    this.emptyInputs_errorMessages = element.all(by.css('.left-tooltip-box:not(.ng-hide)'));

    this.openLoginPage = function () {
        browser.manage().deleteAllCookies();
        browser.refresh();
        this.loginPageButton.click();
        let opened = this.loginPage.isPresent();
        if (!opened) {
            browser.get('/authorize');
        }
    };

    this.login = function (email, password) {
        this.emailInput.sendKeys(email);
        this.passwordInput.sendKeys(password);
        this.viewPasswordButton.click();
        expect(this.passwordInput.getAttribute('type')).toBe('text');
        this.loginButton.click();
    };

    this.logout = function () {
        this.userMenuDropdownd.click();
        this.userMenuLogoutButton.click();
        expect(this.loginButton.isDisplayed()).toBe(true);
    };

    this.open_profile_page = function (email,password) {
        this.openLoginPage();
        this.login(email,password);
        this.userMenuDropdownd.click();
        this.userProfileButton.click();
        expect(this.userProfilePage.isDisplayed()).toBe(true);
    };
};
module.exports = LoginPage;