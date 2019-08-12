"use strict";

const nameColor = require('name-that-color/lib/ntc');
const rgbHex = require('rgb-hex');

beforeEach(function () {
    jasmine.addMatchers({
        toHaveClass: function () {
            return {
                compare: function (actual, expected) {
                    return {
                        pass: actual.getAttribute("class").then(function (classes) {
                            return classes.split(" ").indexOf(expected) !== -1;
                        })
                    };
                }
            };
        },
        
        toHaveColor: function () {
            return {
                compare: function (elem, color) {
                    var result = {};
                    result.pass = elem.getCssValue("color").then(function (cssColor) {
                        var hexColor = rgbHex(cssColor);
                        var colorName = nameColor.name('#' + hexColor.substring(0, 6).toUpperCase());
                        result.message = "Expect '" + colorName[1] + "' to equal '" + color + "'";
                        return colorName[1] === color;
                    });
                    return result;
                }
            }
        },
    });
});
