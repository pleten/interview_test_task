class LoginPage {

    constructor(){

    }

    get nameField() {
        const emailField = $('div[class="form-group email"]>input[name="email"]');
        expect(emailField.isPresent()).toBe(true, 'email field is absent');
        return emailField;
    }

    get passwordField() {
        const passwordField = $('div[class="input-box password"]>input[name="password"]');
        expect(passwordField.isPresent()).toBe(true, 'password field is not presented');
        return passwordField;
    }

    get eyeButton() {
        return $('.icon.icon-eye');
    }

    get submitLoginButton() {
        const submit = $$('[type="submit"]').first();
        expect(submit.isPresent()).toBe(true, 'submitLoginButton button is not presented');
        return submit;
    }

    get alert() {
        return $('.noty_text');
    }

    get warning() {
        return $('.tooltip.tooltip-error');
    }

    get emailWarning() {
        return element.all(by.xpath('//div[@class="form-group email"]/descendant::span[@class="tooltip-text"]')).get(1);
    }

    get passwordWarning() {
        return element.all(by.xpath('//div[@class="form-group email"]/following::span[@class="tooltip-text"]')).first();
    }
}

module.exports = LoginPage;

