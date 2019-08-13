"use strict";

const nameColor = require('name-that-color/lib/ntc');
const rgbHex = require('rgb-hex');

beforeEach(function () {
    jasmine.addMatchers({ 
        toHaveColor: function () {
            return {
                compare: function (elem, color) {
                    let result = {};
                    result.pass = elem.getCssValue("color").then(function (cssColor) {
                        let hexColor = rgbHex(cssColor);
                        let colorName = nameColor.name('#' + hexColor.substring(0, 6).toUpperCase());
                        result.message = "Expect '" + colorName[1] + "' to equal '" + color + "'";
                        return colorName[1] === color;
                    });
                    return result;
                }
            }
        },
    });
});
