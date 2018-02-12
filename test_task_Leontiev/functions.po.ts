import { protractor } from 'protractor';

export class Functions {
    trimResult(toTrim) {
        return toTrim.then(function (val) {
            return val.trim();
        });
    };

    hasClass(element, cls) {
        return element.getAttribute('class').then(function (classes) {
            return classes.split(' ').indexOf(cls) !== -1;
        });
    }

    clear(elem, length) {
        length = length || 100;
        var backspaceSeries = '';
        for (var i = 0; i < length; i++) {
            backspaceSeries += protractor.Key.BACK_SPACE;
        }
        elem.sendKeys(backspaceSeries);
    }
}
