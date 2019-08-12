/* eslint-disable protractor/no-by-xpath */
"use strict";

const AuthorizationPage = function () {
    this.url = "/authorize";
    this.loginBox = element(by.css('form[name=authForm]'));
    
    this.email = ".email ";
    this.password = ".password ";
    // inputs
    this.emailInput = element(by.css(this.email + "input"));
    this.passwordInput = element(by.css(this.password + "input"));

    // this.emailTooltip = element(by.css(this.email + "span.tooltip-text"));
    // this.passwordTooltip = element(by.css(this.password + "span.tooltip-text"))

    this.authFieldsTooltips = function (fieldName, isEmptyField) {
        let errorTooltip;

        switch (fieldName) {
            case this.email: {
                if (isEmptyField) {
                    errorTooltip = element.all(by.css(this.email + "span.tooltip-text")).last();
                } else {
                    errorTooltip = element.all(by.css(this.email + "span.tooltip-text")).first();
                }
            }
                break;
            case this.password: {
                errorTooltip = element(by.xpath(".//div[contains(@class, 'password')]/../..//span[contains(@class, 'tooltip-text')]"));
            }
                break;
            default: {
                errorTooltip = console.log('No error message next to the "' + fieldName + '(' + isEmptyField + ')"')
            }
        }
        return errorTooltip;
    };

    this.loginButton = element(by.buttonText("Login"));

    this.forgotPasswordLink = element(by.buttonText("I forgot"));
    this.forgotPasswordLinkColor = "Curious Blue";

    this.wait = function() {
        browser.wait(EC.visibilityOf(this.emailInput), 20000, "Email input is not visible.");
    };

    this.onEyeIcon = element(by.css(".icon-eye"));
    this.offEyeIcon = element(by.css(".icon-eye-off"));

    this.lastErrorMessage = element.all(by.css("#noty_topCenter_layout_container span")).first();
};

module.exports = new AuthorizationPage();
