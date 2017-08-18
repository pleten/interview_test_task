'use strict';

let I;

module.exports = {

    _init() {
        I = actor();
    },

// Elements
    emailField: '[name=authForm] [name=email]',
    passwordField: '[name=authForm] [name=password]',
    eyeIcon: '.icon.icon-eye',
    loginBtn: '[name=authForm] [type=submit]',
    notSecuredPassword: '[name=password][type=text]',
    emailErrorMessage: "[class=left-tooltip-box][ng-show*='authForm.email'] span",
    passwordErrorMessage: "[class=left-tooltip-box][ng-show*='authForm.password'] span",
    emailFlashErrorMessage: '.noty_text',

// Actions
    fillLoginFormAs(user){
        I.waitForVisible(this.emailField);
        I.fillField(this.emailField, user.email);
        I.fillField(this.passwordField, user.password);
    },

    clickLoginBtn(){
        I.click(this.loginBtn);
    },

    submitLoginFormAs(user){
        this.fillLoginFormAs(user);
        this.clickLoginBtn();
    },

    clickEyeIcon(){
        I.click(this.eyeIcon);
    },

    seeEnabledPassword(password){
        I.seeElement(this.notSecuredPassword);
        I.seeInField(this.notSecuredPassword, password);
    },

    dontSeeEnabledPassword(){
        I.dontSeeElement(this.notSecuredPassword);
    },

    seeErrorMessageForEmail(errorText){
        I.see(errorText, this.emailErrorMessage);
    },

    seeErrorMessageForPassword(errorText){
        I.see(errorText, this.passwordErrorMessage);
    },

    seeFlashErrorMessage(errorText){
        I.waitForVisible(this.emailFlashErrorMessage);
        I.see(errorText, this.emailFlashErrorMessage);
    }
};