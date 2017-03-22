/**
 * Created by QA on 21.03.2017.
 */
'use strict';

module.exports = {
    toDo: {
        titleDashboardPage: element(by.css("head title")),
        nickName: element(by.css(".profile-box a")),
        btnMenu: element(by.css(".profile-box button"))

    },


    titleDashboardPage: function () {
        var todo = this.toDo;
        return todo.titleDashboardPage;
    },

    getNickName: function () {
        var todo = this.toDo;
        return todo.nickName.getAttribute('text');
    },

    getSubMenu: function () {
        var todo = this.toDo;
        todo.btnMenu.click();
        return element(by.css(".dropdown"));
    },

    getClickLogOut: function () {
        element(by.css(".dropdown")).element(by.css(".drop-button")).click();
        browser.waitForAngular();
        return new require('../pages/AuthorizationPage');
    },

    getClickMyProfileLink: function () {
        element.all(by.css(".dropdown .drop-link")).get(3).click();
        browser.waitForAngular();
        return new require('../pages/ProfilePage');
    }


};