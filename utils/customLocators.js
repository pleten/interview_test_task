/**
 * Created by vbu on 2/15/17.
 */
'use strict';

(function (global) {
    global.$uihook = function (hook) {
        return element(by.css('[ui-sref="' + hook + '"]'));
    };

    global.$$data = function (hook) {
        return element.all(by.dataHookAll(hook));
    };
})(global);

var ElementFinder = protractor.ElementFinder;
var ElementArrayFinder = protractor.ElementArrayFinder;

ElementFinder.prototype.$uihook = function (selector) {
    return this.element(by.css('[ui-sref="' + selector + '"]'))
}