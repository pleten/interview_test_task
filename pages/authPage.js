import BasePage from './basePage';

class AuthPage extends BasePage {
    constructor(){
        super();
        this.url = '/authorize';
        this.title = 'Sign In | SSLs.com';
        this.inputEmail = element(by.model('form.email'));
        this.inputPass = element(by.model('form.password'));
        this.btnShowPass = element(by.className('btn-input btn-input-block'));
        this.btnLogin = element(by.buttonText('Login'));
        this.errorEmptyEmail = element(by.css('div.left-tooltip-box:nth-child(3)'));
        this.errorInvalidEmail = element(by.css('div.left-tooltip-box:not(.ng-hide)'));
        this.errorEmptyPass = element(by.css('div.form-group:not(.email) div.left-tooltip-box'));
        this.errorIncorrectEmailPass = element(by.css('span.noty_text'));
    }

    login(email, pass) {
        this.inputEmail.sendKeys(email);
        this.inputPass.sendKeys(pass);
        return this.btnLogin.click();
    }

}
export default new AuthPage();
