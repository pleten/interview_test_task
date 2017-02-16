/**
 * Created by vbu on 2/15/17.
 */
'use strict';

var AuthorizePage = function () {

    this.open = function () {
        $uihook('authorize.index').click()
    };

    this.loginAs = function (user, password) {
        helpers.clearAndSetValue(this.email, user);
        helpers.clearAndSetValue(this.password, password);

        this.submit.click()
    }

};

AuthorizePage.prototype = Object.create({}, {


    form: { get: function() { return element(by.name('authForm')); }},
    email: { get: function() { return this.form.element(by.name('email')); }},
    password: { get: function() { return this.form.element(by.name('password')); }},
    notification: { get: function() { return $('.notification.information'); }},
    submit: { get: function() { return $('.btn-box .btn.primary'); }},
    showPassword: { get: function() { return $('[ng-click*=showPassword]'); }},

    leftErrorBox: { value: function(text) { return element(by.cssContainingText('.tooltip-error .tooltip-text', text)); }},



});

module.exports = AuthorizePage;