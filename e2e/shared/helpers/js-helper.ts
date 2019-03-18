import {ElementFinder} from 'protractor';

export function matchNumber(array) {
    let elementsArr = [];
    for (let i = 0; i < array.length; i++) {
        elementsArr[i] = array[i].match(/[0-9]+.[0-9]+/g).toString();
    }
    return elementsArr;
}

export async function elementIsVisible(element: ElementFinder) {
    let elemVisible: boolean = false;
    await element.isDisplayed().then((visible) => {
        elemVisible = visible;
    });
    return elemVisible;
}