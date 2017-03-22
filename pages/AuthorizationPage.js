/**
 * Created by QA on 21.03.2017.
 */
'use strict';

module.exports = {
    toDo: {
        titleHomePage: element(by.css("head title")),
        inputMail: element(by.model("form.email")),
        inputPass: element(by.model("form.password")),
        eyeBtn: element(by.css(".icon-eye")),
        loginBtn: element(by.css(".primary")),
        errorMsg: element(by.className("noty_text")),
        formAuthorization: element(by.className("authorization-content")),
        urlPage: browser.getCurrentUrl()


    },


    titleAuthorizationPage: function () {
        var todo = this.toDo;
        return todo.titleHomePage;
    },

    writeLoginAndPass: function (login, pass) {
        var todo = this.toDo;
        todo.inputMail.sendKeys(login);
        todo.inputPass.sendKeys(pass);
    },

    inspectPasswordIsDisplayed: function () {
        var todo = this.toDo;
        todo.eyeBtn.click();
        browser.waitForAngular();
        todo.inputPass.isDisplayed();
        return todo.inputPass;
    },
    clickBtnLogin: function () {
        var todo = this.toDo;
        todo.loginBtn.click();
        browser.waitForAngular();

        return require('../pages/DashboardPage');
    },

    getErroreMsg: function () {
        browser.waitForAngular();
        var todo = this.toDo;
        todo.errorMsg.isDisplayed();
        return todo.errorMsg;
    },
    getErrorMsgEmail: function () {
        browser.waitForAngular();
        var todo = this.toDo;
        element.all(by.className("tooltip-text")).get(0).isDisplayed();

        return element.all(by.className("tooltip-text")).get(0).getText();
    },
    getErrorMsgEnterEmail: function () {
        browser.waitForAngular();
        var todo = this.toDo;
        element.all(by.className("tooltip-text")).get(1).isDisplayed();

        return element.all(by.className("tooltip-text")).get(1).getText();
    },
    getErrorMsgPass: function () {
        browser.waitForAngular();
        var todo = this.toDo;
        element.all(by.className("tooltip-text")).get(2).isDisplayed();

        return element.all(by.className("tooltip-text")).get(2).getText();
    },

    getUrlPage: function () {
        var todo = this.toDo;
        return todo.urlPage;
    }


};