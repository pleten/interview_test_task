class AuthorizationPage {

    constructor() {
        this.emailInput = element(by.css('.form-group.email input'));
        this.passwordInput = element(by.css('.input-box.password input'));
        this.loginButton = element(by.css('[name="authForm"] [type="submit"]'));
        this.eyeButton = element(by.css('.icon.icon-eye'));
        this.notifyText = element(by.css('.noty_text'));
        this.wrongEmailErrorMessage = element(by.xpath('//input[@name="email"]/ancestor::div[@class="row"]//div[@class="left-tooltip-box"]'));
        this.wrongPasswordErrorMessage = element(by.css('div[ng-show*="authForm.password"] span'));
    };

    fillLogInForm(email, password) {
        this.emailInput.sendKeys(email);
        this.passwordInput.sendKeys(password);
    };

    clickLogInButton() {
        this.loginButton.click();
    };

    clickOnEyeButton() {
        this.eyeButton.click();
    };

    // async logInViaApi() {
    //     var request = require("request");
    //     var options = {
    //         method: 'POST',
    //         url: 'https://www.ssls.com/authorize/authenticate',
    //         body: '{"email":"ssls.automation+5@gmail.com","password":"123456"}'
    //     };
    //     request(options, function (error, response, body) {
    //         if (error) throw new Error(error);
    //         global.jwtToken = body
    //         console.log(global.jwtToken)
    //     });
    // };
}

module.exports = new AuthorizationPage();