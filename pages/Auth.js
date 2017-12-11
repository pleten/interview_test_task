'use strict';

let I;
let pHome = require('./Home');

module.exports = {

    _init() {
        I = require('../steps_file.js')();
    },

    url: "/authorize",

    locators: {
        nptEmail: '//*[@name="email"]',
        nptPassword: '//*[@name="password"]',
        btnShowPass: '//*[@class="icon icon-eye"]',

        btnSubmit: '//*[text()[contains(.,"Login")]]',
    },

    alerts: {
        incorrectCredentials: "Uh oh! Email or password is incorrect",
        invalidCredentials: {
            self: "Uh oh! This",
            email: "isn’t an email"
        },
        emptyEmail: {
            self: "Oops, please",
            email: "enter your email"
        },
        emptyPassword: {
            self: "Looks like you’ve",
            password: "missed this one"
        }
    },

    authorize(email, password){
        I.wait(1);
        I.fillField(this.locators.nptEmail, email);
        I.fillField(this.locators.nptPassword, password);
        I.click(this.locators.btnShowPass);
        I.seeInField(this.locators.nptPassword, password);
        I.click(this.locators.btnSubmit);
        I.wait(1);
    },

    authorizeSuccess(email, password){
        I.amOnPage(pHome.url);
        I.click(pHome.locators.fldLogin.self);
        this.authorize(email, password);
        I.waitForText(email, 2, pHome.locators.fldLogin.self);
    }
};
