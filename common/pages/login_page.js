'use strict';

class LoginPage {
    constructor() {
        browser.ignoreSynchronization = false;
    }

    get nameField(){
        const el = $('div[class="form-group email"]>input[name="email"]');
        expect(el.isPresent()).toBe(true, 'email field is absent');
    }

    get passwordField() {
        const el = $('div[class="input-box password"]>input[name="password"]');
        expect(el.isPresent()).toBe(true, 'password field is not presented');
        return el;
    }

    get loginButton(){
        const el = $$('[type="submit"]').first();
    }

    get() {
        browser.driver.get('https://www.ssls.com/authorize');
    }

    login(username, password){
        this.nameField.sendKeys(username);
        this.passwordField.sendKeys(password);
        this.loginButton.click();
    }
}