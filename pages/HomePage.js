'use strict';

module.exports = {
    toDo: {
        loginLink: element(by.css('.log-box a')),
        titleHomePage: element(by.css("head title")),
        sslItems: element.all(by.className("ssl-item")),
        filterBox: element.all(by.css(".filter-box .filter-item a"))
    },

    go: function () {
        browser.get('https://www.ssls.com/'); //overrides baseURL
        browser.waitForAngular();
    },

    goAuthorizationPage: function () {
        var todo = this.toDo;

        todo.loginLink.isDisplayed();
        // todo.addField.sendKeys(item);
        todo.loginLink.click();
        browser.waitForAngular();
        return new require('../pages/AuthorizationPage');
    },

    titleHomePage: function () {
        var todo = this.toDo;
        return todo.titleHomePage;
    },

    getCountSslItems: function () {
        var todo = this.toDo;
        return todo.sslItems.count().then(function (count) {
            console.log(count);
        });

    },
    getClickFilterBtn: function (t) {
        var todo = this.toDo;
        todo.filterBox.get(t).click();
        browser.waitForAngular();
    },

    getApplyFilterPersonalSslItem: function () {
        this.getClickFilterBtn(0);
        return this.getCountSslItems();
    },

    getApplyFilterMultiDomainSslItem: function () {
        this.getClickFilterBtn(0);
        this.getClickFilterBtn(4);
        return this.getCountSslItems();
    },

    inspectFeaturedSort: function () {

        return element(by.className("icon-sort-alt-down")).isDisplayed();
    },

    inspectCheapestSort: function () {

        return element(by.className("icon-sort-alt-up")).isDisplayed();
    },

    ClickCheapestSort: function () {
        browser.waitForAngular();
        return element(by.className("icon-sort-alt-up")).click();
    },

    ClickFeaturedSort: function () {
        browser.waitForAngular();
        return element(by.className("icon-sort-alt-down")).click();
    }

};