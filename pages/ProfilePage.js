/**
 * Created by QA on 22.03.2017.
 */
'use strict';

module.exports = {
    toDo: {
        titleDashboardPage: element(by.css("head title")),
        pageTitle: element(by.className("page-title")),
        profileDescription: element.all(by.css(".description .ng-binding ")).getText(),
        supportPinBtn: element(by.name("supportPin"))
    },


    titleProfilePage: function () {
        var todo = this.toDo;
        return todo.titleDashboardPage;
    },

    inspectViewTitlePage: function () {
        var todo = this.toDo;
        return todo.pageTitle.isDisplayed();
    },

    getProfileDescription: function () {
        var todo = this.toDo;
        return todo.profileDescription;
    },

    getClickSupportPinBtn: function () {
        var todo = this.toDo;
        todo.supportPinBtn.click();
        browser.waitForAngular();
    },

    getSupportPin: function () {
        browser.waitForAngular();
        return this.getProfileDescription().get(5).getText();
    },
    getGenerateNewPin: function () {
        this.getClickSupportPinBtn();
        return this.getSupportPin();
    }


};